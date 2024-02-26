import type {GBLocalInfo} from './gamebananaApi';
import {PreloadUtils, Extractors} from '#preload';

const INSTALL_PATH = '/acgcag_mods/3dmigoto/Mods';

type FileEntry = {
  fileName: string;
  isInstalled: boolean;
};

export class GBLocalMod {
  private _itemId: number;
  private _name: string;
  private _nsfw: boolean;
  private _super_category: string;
  private _sub_category: string;
  private _character: string | null;
  private _previewImg: string;
  private _previewImgLocal: string;
  private _files: string[];
  private _modURL: string;
  private _modPath: string;

  public static fromPath(path: string) {
    const file = PreloadUtils.readFile(path);
    return new GBLocalMod(JSON.parse(file) as GBLocalInfo);
  }

  private getLocalFiles() {
    const files = PreloadUtils.getModFolderFiles(this._modPath);
    if (files === null) throw new Error('Failed to get mod file list');

    return files;
  }

  public constructor(localInfo: GBLocalInfo) {
    this._itemId = localInfo.modId;
    this._modPath = `/acgcag_mods/mods/${this._itemId}`;

    this._name = localInfo.name;
    this._nsfw = localInfo.nsfw;
    this._super_category = localInfo.superCategory;
    this._sub_category = localInfo.subCategory;
    this._super_category = this._sub_category === 'Weapons' ? 'Weapons' : this._super_category;
    this._character = this._super_category === 'Skins' ? this._sub_category : null;
    this._previewImg = localInfo.previewImgUrl;
    this._previewImgLocal = PreloadUtils.rootPathlike(`${this._modPath}/${this._itemId}.jpg`);
    this._modURL = localInfo.modUrl;
    this._files = this.getLocalFiles();
  }

  public get itemId() {
    return this._itemId;
  }

  public get name() {
    return this._name;
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

  public get previewImgLocal() {
    return this._previewImgLocal;
  }

  public get files() {
    return this._files;
  }

  public toJSON(): GBLocalInfo {
    return {
      modId: this.itemId,
      nsfw: this.nsfw,
      name: this.name,
      superCategory: this.super_category,
      subCategory: this.sub_category,
      character: this.character,
      previewImgUrl: this.previewImg,
      modUrl: this._modURL,
    };
  }

  public getInstalledMods(): FileEntry[] {
    const entries: FileEntry[] = [];
    for (const f of this._files) {
      entries.push({fileName: f, isInstalled: false});
    }

    const installed = PreloadUtils.getFolderContents(`/acgcag_mods/3dmigoto/Mods/${this._itemId}`);
    if (installed === null) return entries;

    for (const ent of entries) {
      ent.isInstalled = installed.includes(ent.fileName);
    }

    return entries;
  }

  public async installFileEntry(entry: FileEntry) {
    if (entry.isInstalled) throw new Error('Mod file is already installed.');

    const zipPath = [this._modPath, entry.fileName];
    const installPath = [INSTALL_PATH, this._itemId, entry.fileName];
    await Extractors.zipExtractor(zipPath.join('/'), installPath.join('/'));
  }

  public uninstallFileEntry(entry: FileEntry) {
    if (!entry.isInstalled) throw new Error('Mod is not installed.');

    const installPath = [INSTALL_PATH, this._itemId, entry.fileName];
    PreloadUtils.removeDirOrFile(installPath.join('/'));
  }

  public deleteLocalFileEntry(entry: FileEntry) {
    const entryPath = [this._modPath, entry.fileName];
    PreloadUtils.removeDirOrFile(entryPath.join('/'));
    this._files = this.getLocalFiles();
  }
}
