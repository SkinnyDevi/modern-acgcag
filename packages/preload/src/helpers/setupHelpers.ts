import Extractors from '../extractors';
import {ipcRenderer} from 'electron';

/**
 * Extracts GIMI into a mods folder.
 */
async function extractGimi() {
  ipcRenderer.sendSync('check-setup-files');
  return await Extractors.zipExtractor('/3dmigoto_download.zip', '/acgcag_mods/.', true);
}

const SetupHelpers = {extractGimi};

export default SetupHelpers;
