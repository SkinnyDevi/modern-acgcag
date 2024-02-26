import * as fs from 'fs';

import PreloadUtils from '../utils';

const CONFIG_DIR = '/acgcag_config';
const CONFIG_FILE_PATH = CONFIG_DIR + '/config.json';

export type ACGCAG_Config = {
  has_run_setup: boolean;
  genshin_impact_path: string;
};

/**
 * Get the config file path of ACGCAG.
 * @returns File path as `string`.
 */
function getConfigPath() {
  return PreloadUtils.rootPathlike(CONFIG_FILE_PATH);
}

/**
 * Check if the path exists.
 * @param path Path to check.
 */
function pathExists(path: string) {
  return fs.existsSync(path);
}

/**
 * Check if the config file exists.
 */
function configFileExists() {
  return pathExists(PreloadUtils.rootPathlike(CONFIG_FILE_PATH));
}

/**
 * Check if the config path exists.
 */
function configPathExists() {
  return pathExists(PreloadUtils.rootPathlike(CONFIG_DIR));
}

/**
 * Checks if both path and file exist.
 */
function configExists() {
  return configPathExists() && configFileExists();
}

/**
 * Saves the data to a file locally.
 * @param data The data to be stored.
 */
function saveConfig(data: ACGCAG_Config) {
  if (!configPathExists()) fs.mkdirSync(PreloadUtils.rootPathlike(CONFIG_DIR));

  fs.writeFileSync(getConfigPath(), JSON.stringify(data), 'utf-8');
}

/**
 * Read the config file.
 * @returns A Config object with it's properties.
 */
function readConfigFile(): ACGCAG_Config {
  const raw = fs.readFileSync(getConfigPath(), 'utf-8');
  return JSON.parse(raw);
}

const ConfigHelpers = {
  getConfigPath,
  saveConfig,
  pathExists,
  readConfigFile,
  configFileExists,
  configPathExists,
  configExists,
  CONFIG_DIR,
  CONFIG_FILE_PATH,
};

export default ConfigHelpers;
