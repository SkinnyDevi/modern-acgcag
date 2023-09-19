import {ConfigHelpers} from '#preload';
import type {ACGCAG_Config} from '#preload';

export default class ConfigManager {
  private static _path: string;
  private static instance: ConfigManager;

  private _has_run_setup: boolean;

  private constructor(data: ACGCAG_Config) {
    this._has_run_setup = data.has_run_setup;
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
   * Creates or gets an existing config file for ACGCAG.
   * @returns A `ConfigManager` instance with the appropiate configurations.
   */
  public static createOrRetrieveConfigFile() {
    if (ConfigHelpers.configExists()) {
      const data = ConfigHelpers.readConfigFile();
      return new ConfigManager(data);
    }

    const defaults: ACGCAG_Config = {
      has_run_setup: false,
    };

    const manager = new ConfigManager(defaults);
    manager.save();

    return manager;
  }
}
