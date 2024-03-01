import React, {useContext, useEffect} from 'react';

import type {ACGIconsProps} from '@UI/ACGIcons';
import {TitleCtx} from '@/hooks/TitleContext';
import DownloadedSkins from '@/views/DownloadedSkins/DownloadedSkins';
import DownloadedShaderFixes from '@/views/DownloadedShaderFixes/DownloadedShaderFixes';
import SkinImporter from '@/views/SkinImporter/SkinImporter';
import FileEditor from '@/views/FileEditor/FileEditor';
import ModDisplayFrame from '@/views/ModDisplayFrame/ModDisplayFrame';
import RunLauncherView from '@/views/RunLauncher/RunLauncherView';
import SettingsView from '@/views/Settings/SettingsView';
import ExtraToolsView from '@/views/ExtraToolsView/ExtraToolsView';

export default function TabManager() {
  const {title} = useContext(TitleCtx);

  function pressStartupSideBarBtn(name: ACGIconsProps['iconName']) {
    const btn = document.getElementById(`acgcag-sidebar-btn-${name}`);

    if (btn !== null) btn.click();
  }

  function Manager() {
    switch (title.toLowerCase()) {
      case 'downloaded shader fixes':
        return <DownloadedShaderFixes />;
      case 'import skins from gamebanana':
        return <SkinImporter />;
      case 'file edit':
        return <FileEditor />;
      case 'mod manager':
        return <ModDisplayFrame />;
      case '3dmigoto launched':
        return <RunLauncherView />;
      case 'settings':
        return <SettingsView />;
      case 'extra tools':
        return <ExtraToolsView />;
      default:
        return <DownloadedSkins />;
    }
  }

  useEffect(() => {
    pressStartupSideBarBtn('downloaded');
  }, []);

  return (
    <>
      <div className="app-bg"></div>
      <div className="content">
        <Manager />
      </div>
    </>
  );
}
