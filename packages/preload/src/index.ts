/**
 * @module preload
 */

import {shell} from 'electron';
import ConfigHelpers from './configHelper';
import type {ACGCAG_Config} from './configHelper';

/**
 * Open the Game Banana website.
 */
export function openGameBanana() {
  shell.openExternal('https://gamebanana.com');
}

export {ConfigHelpers};
export {ACGCAG_Config};
