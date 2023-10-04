import * as path from 'path';
import axios from 'axios';
import {finished} from 'stream';
import {createWriteStream} from 'fs';
import {shell, ipcRenderer} from 'electron';

import type {AxiosRequestConfig} from 'axios';

/**
 * Request the app path from the main process.
 * @returns The app's string path.
 */
function getAppPath(): string {
  return ipcRenderer.sendSync('app-path');
}

/**
 * Open the Game Banana website.
 */
function openGameBanana() {
  shell.openExternal('https://gamebanana.com/games/8552');
}

/**
 * Restart the app
 */
function restartApp() {
  ipcRenderer.sendSync('restart-app');
}

/**
 * Return a pathlike object from the root of execution.
 * @param pathlikeStr The path string to target.
 * @returns A Pathlike string.
 */
function rootPathlike(...pathString: string[]) {
  const ROOT_PATH = import.meta.env.DEV ? '' : '../..';
  return path.join(getAppPath(), ROOT_PATH, ...pathString);
}

/**
 * Download a file from the internet and store it in the app's directory.
 * @param fileUrl URL of the file to donwload.
 * @param outputLocationPath
 * @param bytesCallback
 * @returns
 */
async function downloadFile(
  fileUrl: string,
  outputLocationPath: string,
  bytesCallback: AxiosRequestConfig['onDownloadProgress'],
) {
  const writer = createWriteStream(rootPathlike(outputLocationPath));

  const request = await axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
    onDownloadProgress: bytesCallback,
  });
  request.data.pipe(writer);

  return new Promise<void>((resolve, reject) => {
    finished(writer, err => {
      if (err) reject();
      else resolve();
    });
  });
}

const PreloadUtils = {
  getAppPath,
  downloadFile,
  rootPathlike,
  restartApp,
  openGameBanana,
};

export default PreloadUtils;
