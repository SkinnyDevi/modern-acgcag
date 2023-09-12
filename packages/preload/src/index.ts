/**
 * @module preload
 */

import {shell} from 'electron';

export {sha256sum} from './nodeCrypto';
export {versions} from './versions';

export function openGameBanana() {
  shell.openExternal('https://gamebanana.com');
}
