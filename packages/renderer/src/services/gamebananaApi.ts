/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

const MAIN_SITE = 'https://gamebanana.com';
const ENDPOINT = 'https://api.gamebanana.com/Core/Item/Data';

export default class GameBananaAPI {
  public static async modFromUrlOrId(urlOrId: string) {
    if (this.inputIsValid(urlOrId)) return await this.modFromUrl(urlOrId);
    else return await this.modFromId(parseInt(urlOrId));
  }

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

  public static async modFromUrl(url: string) {
    const parsed_url = new URL(url);
    const paths = parsed_url.pathname.split('/');
    paths.shift();

    if (paths[0] !== 'mods') this.invalidMod();
    return this.modFromId(parseInt(paths[1]));
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
}

export class GameNotSupportedError extends Error {}

export class ModRequestError extends Error {}
