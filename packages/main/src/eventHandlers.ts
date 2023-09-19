import {existsSync, mkdirSync} from 'node:fs';
import {join} from 'node:path';

import type {App, IpcMain} from 'electron';

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
function checkSetupFiles(app: App) {
  const ROOT_PATH = import.meta.env.DEV ? '' : '../..';

  const modsFolder = join(app.getAppPath(), ROOT_PATH, '/acgcag_mods');
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
}
