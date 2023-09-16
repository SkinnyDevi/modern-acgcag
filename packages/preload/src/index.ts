/**
 * @module preload
 */

import {shell, ipcRenderer} from 'electron';
import ConfigHelpers from './configHelper';
import type {ACGCAG_Config} from './configHelper';

/**
 * Open the Game Banana website.
 */
export function openGameBanana() {
  shell.openExternal('https://gamebanana.com');
}

/**
 * Restart the app
 */
export function restartApp() {
  ipcRenderer.sendSync('restart-app');
}

export {ConfigHelpers};
export {ACGCAG_Config};
