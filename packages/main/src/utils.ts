import {existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {app} from 'electron';

const ROOT_PATH = import.meta.env.DEV ? '' : '../..';
export const rootPathlike = (...paths: string[]) => join(app.getAppPath(), ROOT_PATH, ...paths);

/**
 * Writes to config if the setup has been completed.
 * @param runSetup Value to assign to the setup complete config.
 */
export function writeToConfig(runSetup: boolean) {
  const folderPath = rootPathlike('/acgcag_config');
  const path = rootPathlike('/acgcag_config/config.json');

  if (!existsSync(folderPath)) mkdirSync(folderPath, {recursive: true});

  let config;
  if (!existsSync(path)) {
    config = {
      has_run_setup: false,
    };
  } else {
    const raw = readFileSync(path, 'utf-8');
    config = JSON.parse(raw);
  }

  config.has_run_setup = runSetup;
  writeFileSync(path, JSON.stringify(config));
}

/**
 * Checks if GIMI exists to run the setup installer if not.
 */
export function gimiChecker() {
  const gimiFolder = rootPathlike('/acgcag_mods/3dmigoto');
  const gimiExists = existsSync(gimiFolder);
  if (!gimiExists) return false;

  const gimiNotEmpty = readdirSync(gimiFolder).length > 0;
  if (gimiNotEmpty) return false;

  writeToConfig(false);

  return true;
}
