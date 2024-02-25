import type {GBLocalInfo} from './gamebananaApi';
import {PreloadUtils} from '#preload';

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

  public static fromPath(path: string) {
    const file = PreloadUtils.readFile(path);
    return new GBLocalMod(JSON.parse(file) as GBLocalInfo);
  }

  public constructor(localInfo: GBLocalInfo) {
    this._itemId = localInfo.modId;
    const modPath = `/acgcag_mods/mods/${this._itemId}`;

    this._name = localInfo.name;
    this._nsfw = localInfo.nsfw;
    this._super_category = localInfo.superCategory;
    this._sub_category = localInfo.subCategory;
    this._super_category = this._sub_category === 'Weapons' ? 'Weapons' : this._super_category;
    this._character = this._super_category === 'Skins' ? this._sub_category : null;
    this._previewImg = localInfo.previewImgUrl;
    this._previewImgLocal = PreloadUtils.rootPathlike(`${modPath}/${this._itemId}.jpg`);
    this._modURL = localInfo.modUrl;

    const files = PreloadUtils.getModFolderFiles(modPath);
    if (files !== null) this._files = files;
    else throw new Error('Failed to get mod file list');
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
}
