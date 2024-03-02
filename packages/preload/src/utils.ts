import * as path from 'path';
import axios from 'axios';
import type {AxiosRequestConfig} from 'axios';
import {finished} from 'stream';
import {promisify} from 'util';
import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'fs';
import {shell, ipcRenderer} from 'electron';
import ConfigHelpers from './helpers/configHelper';

const promisifiedFinish = promisify(finished);
axios.defaults.adapter = 'http';

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
  shell.openPath(rootPathlike('/acgcag_mods/3dmigoto/3DMigoto Loader.exe'));
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

  return axios({
    method: 'get',
    url: fileUrl,
    responseType: 'stream',
    onDownloadProgress: bytesCallback,
    timeout: 10000,
    timeoutErrorMessage: 'The download timed out.',
  }).then(response => {
    response.data.pipe(writer);
    return promisifiedFinish(writer);
  });
}

/**
 * Get contents of the folder.
 * @param path Path to get the contents from.
 * @param onlyDirs Retrieve only the name of directories.
 * @returns Name entries of the contents found.
 */
function getFolderContents(path: string, onlyDirs: boolean = false) {
  try {
    const contents = readdirSync(rootPathlike(path), {withFileTypes: true});

    let dirContents = contents;
    if (onlyDirs) dirContents = contents.filter(ent => ent.isDirectory());

    return dirContents.map(x => x.name);
  } catch {
    return null;
  }
}

function getModFolders() {
  return getFolderContents('/acgcag_mods/mods');
}

function getShaderFolders() {
  return getFolderContents('/acgcag_mods/shaders');
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

/**
 * Removes a directory/file, even if it is not empty.
 * @param path Path to directory to remove.
 */
function removeDirOrFile(path: string) {
  rmSync(rootPathlike(path), {recursive: true, force: true, retryDelay: 200, maxRetries: 5});
}

const PreloadUtils = {
  getAppPath,
  run3dmigoto,
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
  getFolderContents,
  removeDirOrFile,
};

export default PreloadUtils;
