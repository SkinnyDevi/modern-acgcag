import {shell, ipcRenderer} from 'electron';

import ConfigHelpers from './helpers/configHelper';
import FileManager from './managers/fileManager';

/**
 * Request the app path from the main process.
 * @returns The app's string path.
 */
function getAppPath(): string {
  return ipcRenderer.sendSync('app-path');
}

/**
 * Open URL in browser.
 */
function openURLInBrowser(url: string) {
  shell.openExternal(url);
}

/**
 * Run 3DMIGOTO executable.
 */
function run3dmigoto() {
  shell.openPath(FileManager.rootPathlike('/acgcag_mods/3dmigoto/3DMigoto Loader.exe'));
  setTimeout(() => {
    shell.openPath(ConfigHelpers.readConfigFile().genshin_impact_path);
  }, 5000);
}

/**
 * Open the Game Banana website.
 */
function openGameBanana() {
  openURLInBrowser('https://gamebanana.com/games/8552');
}

/**
 * Restart the app
 */
function restartApp() {
  ipcRenderer.sendSync('restart-app');
}

const PreloadUtils = {
  getAppPath,
  run3dmigoto,
  restartApp,
  openURLInBrowser,
  openGameBanana,
};

export default PreloadUtils;
