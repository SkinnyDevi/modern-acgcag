import axios from 'axios';
import {PreloadUtils} from '#preload';

const MAIN_SITE = 'https://gamebanana.com';
const ENDPOINT = 'https://api.gamebanana.com/Core/Item/Data';

function idExtractor(url: string) {
  try {
    const parsed_url = new URL(url);
    const paths = parsed_url.pathname.split('/');
    paths.shift();

    return {
      urlType: paths[0],
      extractedId: parseInt(paths[1]),
    };
  } catch {
    throw new Error('Could not extract item ID from url.');
  }
}

export default class GameBananaAPI {
  public static inputIsValid(query: string) {
    const urlRegex = /^https:\/\/gamebanana.com\/mods\/[0-9]{6}$/gi;
    const idRegex = /^[0-9]{6}$/gi;

    if (query.match(new RegExp(urlRegex))) return true;
    else if (query.match(new RegExp(idRegex))) return false;
    else this.invalidMod();
  }

  private static invalidMod() {
    throw new Error('Invalid mod input for mod search');
  }

  public static async modFromUrlOrId(urlOrId: string) {
    if (this.inputIsValid(urlOrId)) return await this.modFromUrl(urlOrId);
    else return await this.modFromId(parseInt(urlOrId));
  }

  public static async modFromUrl(url: string) {
    const {urlType, extractedId} = idExtractor(url);

    if (urlType !== 'mods') this.invalidMod();
    return await this.modFromId(extractedId);
  }

  public static async modFromId(id: number) {
    const request_url = new URL(ENDPOINT);
    const params = request_url.searchParams;

    const searchFields =
      'name,Game().name,Nsfw().bIsNsfw(),RootCategory().name,Category().name,Preview().sSubFeedImageUrl(),Files().aFiles()';

    params.append('itemid', id.toString());
    params.append('itemtype', 'Mod');
    params.append('fields', searchFields);

    const response = (await axios.get(request_url.toString())).data;
    if (response.error !== undefined) throw new ModRequestError(response.error_code);

    return new GBModPost(id, response);
  }

  public static async toolFromUrl(url: string) {
    const {extractedId} = idExtractor(url);
    return await this.toolFromId(extractedId);
  }

  public static async toolFromId(id: number) {
    const request_url = new URL(ENDPOINT);
    const params = request_url.searchParams;

    const searchFields = 'name,description,authors,Game().name,Files().aFiles()';

    params.append('itemid', id.toString());
    params.append('itemtype', 'Tool');
    params.append('fields', searchFields);

    const response = (await axios.get(request_url.toString())).data;
    if (response.error !== undefined) throw new ToolRequestError(response.error_code);
    return new GBToolPost(id, response);
  }
}

export type GBDownloadableFile = {
  _bContainsExe: boolean;
  _idRow: number;
  _nDownloadCount: number;
  _nFilesize: number;
  _sDescription: string;
  _sDownloadUrl: string;
  _sFile: string;
  _tsDateAdded: number;
};

export type GBLocalModInfo = {
  modId: number;
  nsfw: boolean;
  name: string;
  superCategory: string;
  subCategory: string;
  character: string | null;
  previewImgUrl: string;
  modUrl: string;
};

export class GBModPost {
  private _itemId: number;
  private _name: string;
  private _game: string;
  private _nsfw: boolean;
  private _super_category: string;
  private _sub_category: string;
  private _character: string | null;
  private _previewImg: string;
  private _files: FileList;

  public constructor(itemid: number, response: unknown[]) {
    this._itemId = itemid;
    this._name = response[0] as string;
    this._game = response[1] as string;

    if (this._game !== 'Genshin Impact') {
      throw new GameNotSupportedError('Game not supported');
    }

    this._nsfw = response[2] as boolean;
    this._super_category = response[3] as string;
    this._sub_category = response[4] as string;
    this._super_category = this._sub_category === 'Weapons' ? 'Weapons' : this._super_category;
    this._previewImg = response[5] as string;
    this._files = response[6] as FileList;

    console.log(this._super_category, this._sub_category);
    this._character = this._super_category === 'Skins' ? this._sub_category : null;
  }

  public get itemId() {
    return this._itemId;
  }

  public get name() {
    return this._name;
  }

  public get game() {
    return this._game;
  }

  public get nsfw() {
    return this._nsfw;
  }

  public get super_category() {
    return this._super_category;
  }

  public get sub_category() {
    return this._sub_category;
  }

  public get character() {
    return this._character;
  }

  public get previewImg() {
    return this._previewImg;
  }

  public get files(): GBDownloadableFile[] {
    return Object.values(this._files) as unknown as GBDownloadableFile[];
  }

  public get modURL() {
    return `${MAIN_SITE}/mods/${this._itemId}`;
  }

  public toJSON(): GBLocalModInfo {
    return {
      modId: this.itemId,
      nsfw: this.nsfw,
      name: this.name,
      superCategory: this.super_category,
      subCategory: this.sub_category,
      character: this.character,
      previewImgUrl: this.previewImg,
      modUrl: this.modURL,
    };
  }

  public async saveInfoToPath(outDir: string) {
    const infoFile = outDir + `/${this.itemId}.json`;
    const imgFile = outDir + `/${this.itemId}.jpg`;

    PreloadUtils.saveToFile(JSON.stringify(this.toJSON()), infoFile);
    PreloadUtils.downloadFile(this.previewImg, imgFile, () => {});
  }
}

export class GameNotSupportedError extends Error {}
export class ModRequestError extends Error {}
export class ToolRequestError extends Error {}

export type ToolAuthor = {
  name: string;
  authorId: number;
};

export type GBLocalToolInfo = {
  toolId: number;
  name: string;
  description: string;
  authors: ToolAuthor[];
  toolUrl: string;
};

export class GBToolPost {
  private _toolId: number;
  private _name: string;
  private _description: string | undefined;
  private _authors: ToolAuthor[];
  private _game: string;
  private _files: FileList;

  private authorParser(authorObj: string): ToolAuthor[] {
    const raw = JSON.parse(authorObj);

    const authors: ToolAuthor[] = [];
    for (const keys of Object.keys(raw)) {
      const rawAuthors: (string | number)[][] = raw[keys];
      if (rawAuthors.length > 0)
        for (let author of rawAuthors) {
          author = author.filter(n => n);

          const newAuthor: ToolAuthor = {
            name: author[0] as string,
            authorId: author[1] as number,
          };

          const isDupe = authors.find(a => a.name === newAuthor.name);
          if (isDupe === undefined) authors.push(newAuthor);
        }
    }

    return authors;
  }

  public constructor(toolId: number, response: unknown[]) {
    this._toolId = toolId;
    this._name = response[0] as string;

    const description = response[1] as string;
    this._description = description.length > 0 ? description : undefined;

    this._authors = this.authorParser(response[2] as string);
    this._game = response[3] as string;

    if (this._game !== 'Genshin Impact') {
      throw new GameNotSupportedError('Game not supported');
    }

    this._files = response[4] as FileList;
  }

  public get toolId() {
    return this._toolId;
  }

  public get name() {
    return this._name;
  }

  public get description() {
    return this._description;
  }

  public get authors() {
    return this._authors;
  }

  public get files(): GBDownloadableFile[] {
    return Object.values(this._files) as unknown as GBDownloadableFile[];
  }

  public get toolURL() {
    return `${MAIN_SITE}/tools/${this._toolId}`;
  }

  public toJSON(): GBLocalToolInfo {
    return {
      toolId: this.toolId,
      name: this.name,
      description: this.description!,
      authors: this.authors,
      toolUrl: this.toolURL,
    };
  }

  public async saveInfoToPath(outDir: string) {
    const infoFile = outDir + `/${this.toolId}.json`;
    PreloadUtils.saveToFile(JSON.stringify(this.toJSON()), infoFile);
  }
}
