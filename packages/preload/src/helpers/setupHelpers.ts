import {existsSync, mkdirSync} from 'fs';
import {join} from 'path';

import Extractors from '../extractors';
import PreloadUtils from '../utils';

/**
 * Extracts GIMI into a mods folder.
 */
async function extractGimi() {
  const modsFolder = PreloadUtils.rootPathlike('/acgcag_mods');
  const modsExists = existsSync(modsFolder);

  const gimiFolder = join(modsFolder, '/3dmigoto');
  const gimiExists = existsSync(gimiFolder);

  const acgcagModsFolder = join(modsFolder, '/mods');
  const acgcagModsExists = existsSync(acgcagModsFolder);

  if (!modsExists || !gimiExists || !acgcagModsExists) {
    if (!modsExists) mkdirSync(modsFolder);
    if (!gimiExists) mkdirSync(gimiFolder);
    if (!acgcagModsExists) mkdirSync(acgcagModsFolder);
  }

  return await Extractors.zipExtractor('/3dmigoto_download.zip', '/acgcag_mods/.');
}

const SetupHelpers = {extractGimi};

export default SetupHelpers;
