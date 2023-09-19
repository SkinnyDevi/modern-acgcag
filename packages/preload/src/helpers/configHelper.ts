import * as fs from 'fs';

import PreloadUtils from '../utils';

export type ACGCAG_Config = {
  has_run_setup: boolean;
};

/**
 * Get the config file path of ACGCAG.
 * @returns File path as `string`.
 */
function getConfigPath() {
  return PreloadUtils.rootPathlike('/acgcag_config');
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
function configExists() {
  return pathExists(getConfigPath());
}

/**
 * Saves the data to a file locally.
 * @param data The data to be stored.
 */
function saveConfig(data: ACGCAG_Config) {
  if (!configExists()) fs.mkdirSync(getConfigPath());

  fs.writeFileSync(getConfigPath() + '/config.json', JSON.stringify(data), 'utf-8');
}

/**
 * Read the config file.
 * @returns A Config object with it's properties.
 */
function readConfigFile(): ACGCAG_Config {
  const raw = fs.readFileSync(getConfigPath() + '/config.json', 'utf-8');
  return JSON.parse(raw);
}

const ConfigHelpers = {
  getConfigPath,
  saveConfig,
  pathExists,
  readConfigFile,
  configExists,
};

export default ConfigHelpers;
