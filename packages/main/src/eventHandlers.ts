import {existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync} from 'node:fs';
import {join} from 'node:path';
import {app} from 'electron';
import type {App, IpcMain} from 'electron';

const ROOT_PATH = import.meta.env.DEV ? '' : '../..';
export const rootPathlike = (...paths: string[]) => join(app.getAppPath(), ROOT_PATH, ...paths);

export default function initEventHandlers(ipcMain: IpcMain, app: App) {
  ipcMain.on('app-path', e => {
    e.returnValue = app.getAppPath();
  });

  ipcMain.on('restart-app', _ => {
    app.relaunch();
    app.exit();
  });

  ipcMain.on('check-setup-files', e => {
    e.returnValue = checkSetupFiles(app);
  });
}

/**
 * Check if the setup files exist.
 */
export function checkSetupFiles(app: App) {
  const ROOT_PATH = import.meta.env.DEV ? '' : '../..';

  const modsFolder = join(app.getAppPath(), ROOT_PATH, '/acgcag_mods');
  const modsExists = existsSync(modsFolder);

  const gimiFolder = join(modsFolder, '/3dmigoto');
  const gimiExists = existsSync(gimiFolder);

  const acgcagModsFolder = join(modsFolder, '/mods');
  const acgcagModsExists = existsSync(acgcagModsFolder);

  const acgcagShadersFolder = join(modsFolder, '/shaders');
  const acgcagShadersExists = existsSync(acgcagShadersFolder);

  if (!modsExists) mkdirSync(modsFolder);
  if (!gimiExists) mkdirSync(gimiFolder);
  if (!acgcagModsExists) mkdirSync(acgcagModsFolder);
  if (!acgcagShadersExists) mkdirSync(acgcagShadersFolder);
}

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
