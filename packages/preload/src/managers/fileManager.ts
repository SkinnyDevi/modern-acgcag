import {
  createWriteStream,
  existsSync,
  mkdirSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'fs';
import type {AxiosRequestConfig} from 'axios';
import * as path from 'path';
import axios from 'axios';
import {finished} from 'stream';
import {promisify} from 'util';

import PreloadUtils from '../utils';

const promisifiedFinish = promisify(finished);
axios.defaults.adapter = 'http';

/**
 * Return a pathlike object from the root of execution.
 * @param pathlikeStr The path string to target.
 * @returns A Pathlike string.
 */
function rootPathlike(...pathString: string[]) {
  const ROOT_PATH = import.meta.env.DEV ? '' : '../..';
  return path.join(PreloadUtils.getAppPath(), ROOT_PATH, ...pathString);
}

/**
 * Checks if a folder exists, if not creates it recursively.
 * @param dirPath Path to directory.
 * @param useRootPathLike If `FileManager.rootPathLike` should be applied to the path.
 */
function checkOrCreateDir(dirPath: string, useRootPathLike = true) {
  const disectedOutDir = dirPath.split('/');
  disectedOutDir.pop();
  const enclosingFolder = disectedOutDir.join('/');

  const path = useRootPathLike ? rootPathlike(enclosingFolder) : enclosingFolder;
  if (!existsSync(path)) mkdirSync(path, {recursive: true});
}

/**
 * Save content to a file.
 * @param fileContent The content to save.
 * @param outputPath The output path to save to.
 * @param useRootPathLike If `FileManager.rootPathLike` should be applied to the path.
 */
function saveToFile(fileContent: string, outputPath: string, useRootPathLike = true) {
  checkOrCreateDir(outputPath, useRootPathLike);

  const path = useRootPathLike ? rootPathlike(outputPath) : outputPath;
  writeFileSync(path, fileContent, 'utf-8');
}

/**
 * Download a file from the internet and store it in the app's directory.
 * @param fileUrl URL of the file to donwload.
 * @param outputLocationPath
 * @param bytesCallback
 * @param useRootPathLike If `FileManager.rootPathLike` should be applied to the path.
 */
async function downloadFile(
  fileUrl: string,
  outputLocationPath: string,
  bytesCallback: AxiosRequestConfig['onDownloadProgress'],
  useRootPathLike = true,
) {
  checkOrCreateDir(outputLocationPath, useRootPathLike);
  const path = useRootPathLike ? rootPathlike(outputLocationPath) : outputLocationPath;
  const writer = createWriteStream(path);

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
 * @param useRootPathLike If `FileManager.rootPathLike` should be applied to the path.
 * @returns Name entries of the contents found.
 */
function getFolderContents(path: string, onlyDirs: boolean = false, useRootPathLike = true) {
  try {
    path = useRootPathLike ? rootPathlike(path) : path;
    const contents = readdirSync(path, {withFileTypes: true});

    let dirContents = contents;
    if (onlyDirs) dirContents = contents.filter(ent => ent.isDirectory());

    return dirContents.map(x => x.name);
  } catch {
    return null;
  }
}

/**
 * Retrieves the folders of all downloaded mods.
 * @returns List of all mod folders.
 */
function getModFolders() {
  return getFolderContents('/acgcag_mods/mods');
}

/**
 * Retrieves the olders of all downloaded shaders.
 * @returns List of all shader foldes.
 */
function getShaderFolders() {
  return getFolderContents('/acgcag_mods/shaders');
}

/**
 * Read the contents of a directory.
 * @param path Path to read from. Must be a directory and exist-
 * @param useRootPathLike If `FileManager.rootPathLike` should be applied to the path.
 * @returns A list of the mod's downloaded file names.
 */
function getModFolderFiles(path: string, useRootPathLike = true) {
  path = useRootPathLike ? rootPathlike(path) : path;
  if (!existsSync(path)) return null;

  const contents = readdirSync(path, {withFileTypes: true});
  const modFiles = contents.filter(
    file => !file.isDirectory() && !(file.name.includes('.json') || file.name.includes('.jpg')),
  );

  return modFiles.map(f => f.name).sort();
}

/**
 * Read the content of a file.
 * @param path File to read from.
 * @param useRootPathLike If `FileManager.rootPathLike` should be applied to the path.
 * @returns The file's content.
 */
function readFile(path: string, useRootPathLike = true) {
  path = useRootPathLike ? rootPathlike(path) : path;
  return readFileSync(path, 'utf8');
}

/**
 * Removes a directory/file, even if it is not empty.
 * @param path Path to directory to remove.
 * @param useRootPathLike If `FileManager.rootPathLike` should be applied to the path.
 */
function removeDirOrFile(path: string, useRootPathLike = true) {
  path = useRootPathLike ? rootPathlike(path) : path;
  rmSync(path, {recursive: true, force: true, retryDelay: 200, maxRetries: 5});
}

/**
 * Check if the path exists.
 * @param path Path to check.
 * @param useRootPathLike If `FileManager.rootPathLike` should be applied to the path.
 * @returns True if path exists.
 */
function pathExists(path: string, useRootPathLike = true) {
  path = useRootPathLike ? rootPathlike(path) : path;
  return existsSync(path);
}

const FileManager = {
  saveToFile,
  readFile,
  getModFolderFiles,
  getModFolders,
  getShaderFolders,
  getFolderContents,
  downloadFile,
  removeDirOrFile,
  rootPathlike,
  checkOrCreateDir,
  pathExists,
};

export default FileManager;
