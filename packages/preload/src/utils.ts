import * as path from 'path';
import axios from 'axios';
import {finished} from 'stream';
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  writeFileSync,
} from 'fs';
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
 * Open URL in browser.
 */
function openURLInBrowser(url: string) {
  shell.openExternal(url);
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
 * Checks if a folder exists, if not creates it recursively.
 * @param dirName
 */
function checkOrCreateDir(dirName: string) {
  const disectedOutDir = dirName.split('/');
  disectedOutDir.pop();
  const enclosingFolder = disectedOutDir.join('/');

  if (!existsSync(rootPathlike(enclosingFolder)))
    mkdirSync(rootPathlike(enclosingFolder), {recursive: true});
}

/**
 * Save content to a file.
 * @param fileContent The content to save.
 * @param outputPath The output path to save to.
 */
function saveToFile(fileContent: string, outputPath: string) {
  checkOrCreateDir(outputPath);

  writeFileSync(rootPathlike(outputPath), fileContent);
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
  checkOrCreateDir(outputLocationPath);

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

/**
 * Gets all the directories within the respective folder.
 * @param type From which category to gather folders from.
 * @returns A list of names of the directories. In this case. IDs from such mods/shaders.
 */
function getFolderContent(type: 'mod' | 'shader') {
  const contents = readdirSync(rootPathlike(`/acgcag_mods/${type}s`), {withFileTypes: true});
  const mods = contents.filter(dir => dir.isDirectory());

  return mods.map(d => d.name);
}

function getModFolders() {
  return getFolderContent('mod');
}

function getShaderFolders() {
  return getFolderContent('shader');
}

/**
 * Read the contents of a directory.
 * @param path Path to read from. Must be a directory and exist-
 * @returns A list of the mod's downloaded file names.
 */
function getModFolderFiles(path: string) {
  if (!existsSync(rootPathlike(path))) return null;

  const contents = readdirSync(rootPathlike(path), {withFileTypes: true});
  const modFiles = contents.filter(
    file => !file.isDirectory() && !(file.name.includes('.json') || file.name.includes('.jpg')),
  );

  return modFiles.map(f => f.name).sort();
}

/**
 * Read the content of a file.
 * @param path File to read from.
 * @returns The file's content.
 */
function readFile(path: string) {
  return readFileSync(rootPathlike(path), 'utf8');
}

const PreloadUtils = {
  getAppPath,
  downloadFile,
  rootPathlike,
  restartApp,
  openURLInBrowser,
  openGameBanana,
  saveToFile,
  readFile,
  getModFolderFiles,
  getModFolders,
  getShaderFolders,
};

export default PreloadUtils;
