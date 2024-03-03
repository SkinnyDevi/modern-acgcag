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
export function checkSetupFiles(app: App) {
  const ROOT_PATH = import.meta.env.DEV ? '' : '../..';

  const modsFolder = join(app.getAppPath(), ROOT_PATH, '/acgcag_mods');
  const cacheFolder = join(app.getAppPath(), ROOT_PATH, '/.acgcag_cache');
  const gimiFolder = join(modsFolder, '/3dmigoto');
  const acgcagModsFolder = join(modsFolder, '/mods');
  const acgcagShadersFolder = join(modsFolder, '/shaders');
  const acgcagToolsFolder = join(modsFolder, '/tools');

  if (!existsSync(modsFolder)) mkdirSync(modsFolder);
  if (!existsSync(cacheFolder)) mkdirSync(cacheFolder);
  if (!existsSync(gimiFolder)) mkdirSync(gimiFolder);
  if (!existsSync(acgcagModsFolder)) mkdirSync(acgcagModsFolder);
  if (!existsSync(acgcagShadersFolder)) mkdirSync(acgcagShadersFolder);
  if (!existsSync(acgcagToolsFolder)) mkdirSync(acgcagToolsFolder);
}
