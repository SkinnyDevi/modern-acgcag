import type {ACGCAG_Config} from '#preload';
import {ConfigHelpers} from '#preload';

const DEFAULT_CONFIG: ACGCAG_Config = {
  has_run_setup: false,
  // genshin_impact_path: 'C:\\Program Files\\Genshin Impact\\Genshin Impact Game\\Genshin Impact.exe',
  genshin_impact_path: '"C:\\Users\\Felix MV\\Desktop\\ㅤㅤㅤㅤㅤ\\Genshin Impact.lnk"',
};

export default class ConfigManager {
  private static _path: string;
  private static instance: ConfigManager;

  private _has_run_setup: boolean;
  private _genshin_impact_path: string;

  private constructor(data: ACGCAG_Config) {
    this._has_run_setup = data.has_run_setup;
    this._genshin_impact_path = data.genshin_impact_path;
    ConfigManager.instance = this;
    ConfigManager._path = ConfigHelpers.getConfigPath();
  }

  /**
   * Config testing if the setup installer has been run.
   */
  public get has_run_setup() {
    return this._has_run_setup;
  }

  /**
   * The config's file path.
   */
  public static get path() {
    return ConfigManager._path || '';
  }

  /**
   * Mark the setup as complete in the config.
   */
  public setupComplete() {
    this._has_run_setup = true;
    this.save();
  }

  /**
   * Saves the config file.
   */
  public save() {
    ConfigHelpers.saveConfig(this.info());
  }

  /**
   * @returns An object with all of the `ConfigManager` properties and states.
   */
  public info(): ACGCAG_Config {
    return {
      has_run_setup: this._has_run_setup,
      genshin_impact_path: this._genshin_impact_path,
    };
  }

  /**
   * Instantiate or retrieve a `ConfigManager` instance.
   * @returns A `ConfigManager` singleton instance.
   */
  public static setup() {
    if (ConfigManager.instance) return ConfigManager.instance;
    return ConfigManager.createOrRetrieveConfigFile();
  }

  /**
   * Validates the config input and fills out configs that are `undefined`
   * @param data Config to validate
   * @returns Validated config
   */
  private static validate(data: ACGCAG_Config) {
    const obj = JSON.parse(JSON.stringify(data));
    const objDefaults = Object.create(DEFAULT_CONFIG);

    for (const key in objDefaults) {
      if (typeof obj[key] === 'undefined') {
        obj[key] = objDefaults[key];
      }
    }

    ConfigHelpers.saveConfig(obj);
    return obj as ACGCAG_Config;
  }

  /**
   * Creates or gets an existing config file for ACGCAG.
   * @returns A `ConfigManager` instance with the appropiate configurations.
   */
  public static createOrRetrieveConfigFile() {
    if (ConfigHelpers.configExists()) {
      let data = ConfigHelpers.readConfigFile();
      data = this.validate(data);
      return new ConfigManager(data);
    }

    const manager = new ConfigManager(DEFAULT_CONFIG);
    manager.save();

    return manager;
  }
}
