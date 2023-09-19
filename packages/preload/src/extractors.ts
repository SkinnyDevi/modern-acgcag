import decompress from 'decompress';
import {rmSync} from 'fs';

import PreloadUtils from './utils';

/**
 * Extracts the given zip file to a directory.
 * @param pathToZip String path to the zip file.
 * @param outDir Directory of output.
 * @param deleteZip If the zip file should be deleted upon extraction.
 */
function zipExtractor(pathToZip: string, outDir: string, deleteZip = false) {
  if (!pathToZip.includes('.zip'))
    throw new Error('ZipExtractor path does not point to a zip file');

  return new Promise<void>((resolve, reject) => {
    const extractPath = PreloadUtils.rootPathlike(pathToZip);
    const outPath = PreloadUtils.rootPathlike(outDir);

    decompress(extractPath, outPath)
      .then(() => {
        if (deleteZip) rmSync(extractPath, {force: true, maxRetries: 5, retryDelay: 200});
        resolve();
      })
      .catch(reason => reject(reason));
  });
}

const Extractors = {zipExtractor};

export default Extractors;
