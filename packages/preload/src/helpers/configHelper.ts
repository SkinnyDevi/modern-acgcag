import FileManager from '../managers/fileManager';

const CONFIG_DIR = '/acgcag_config';
const CONFIG_FILE_PATH = CONFIG_DIR + '/config.json';

export type ACGCAG_Config = {
  has_run_setup: boolean;
  genshin_impact_path: string;
  blur_nsfw: boolean;
};

/**
 * Get the config file path of ACGCAG.
 * @returns File path as `string`.
 */
function getConfigPath() {
  return FileManager.rootPathlike(CONFIG_FILE_PATH);
}

/**
 * Check if the config file exists.
 */
function configFileExists() {
  return FileManager.pathExists(FileManager.rootPathlike(CONFIG_FILE_PATH));
}

/**
 * Check if the config path exists.
 */
function configPathExists() {
  return FileManager.pathExists(FileManager.rootPathlike(CONFIG_DIR));
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
  FileManager.checkOrCreateDir(CONFIG_DIR);
  FileManager.saveToFile(JSON.stringify(data), CONFIG_FILE_PATH);
}

/**
 * Read the config file.
 * @returns A Config object with it's properties.
 */
function readConfigFile(): ACGCAG_Config {
  const raw = FileManager.readFile(CONFIG_FILE_PATH);
  return JSON.parse(raw);
}

const ConfigHelpers = {
  getConfigPath,
  saveConfig,
  readConfigFile,
  configFileExists,
  configPathExists,
  configExists,
  CONFIG_DIR,
  CONFIG_FILE_PATH,
};

export default ConfigHelpers;
