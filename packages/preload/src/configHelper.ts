import * as fs from 'fs';
import * as path from 'path';
import {ipcRenderer} from 'electron';

export type ACGCAG_Config = {
  has_run_setup: boolean;
};

/**
 * Request the app path from the main process.
 * @returns The app's string path.
 */
function getAppPath(): string {
  return ipcRenderer.sendSync('app-path');
}

const CONFIG_FOLDER_PATH = import.meta.env.DEV ? '/acgcag_config' : '../../acgcag_config';
const CONFIG_PATH = path.join(getAppPath(), CONFIG_FOLDER_PATH);

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
  return pathExists(CONFIG_PATH);
}

/**
 * Saves the data to a file locally.
 * @param data The data to be stored.
 */
function saveConfig(data: ACGCAG_Config) {
  console.log(CONFIG_PATH);
  console.log(configExists());
  if (!configExists()) {
    fs.mkdirSync(CONFIG_PATH);
  }

  fs.writeFileSync(CONFIG_PATH + '/config.json', JSON.stringify(data), 'utf-8');
}

/**
 * Read the config file.
 * @returns A Config object with it's properties.
 */
function readConfigFile(): ACGCAG_Config {
  const raw = fs.readFileSync(CONFIG_PATH + '/config.json', 'utf-8');
  return JSON.parse(raw);
}

const ConfigHelpers = {
  saveConfig,
  pathExists,
  readConfigFile,
  configExists,
  CONFIG_PATH,
};

export default ConfigHelpers;
