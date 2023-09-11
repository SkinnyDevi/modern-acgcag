import React, {useContext, useEffect} from 'react';
import {TitleCtx} from '@/hooks/TitleContext';
import type {ACGIconsProps} from '../ACGIcons';
import DownloadedSkins from '@/views/DownloadedSkins/DownloadedSkins';
import DownloadedShaderFixes from '@/views/DownloadedShaderFixes/DownloadedShaderFixes';

export default function TabManager() {
  const {title} = useContext(TitleCtx);

  function pressStartupSideBarBtn(name: ACGIconsProps['iconName']) {
    const btn = document.getElementById(`acgcag-sidebar-btn-${name}`);

    if (btn !== null) btn.click();
  }

  function Manager() {
    switch (title) {
      case 'Downloaded Shader Fixes':
        return <DownloadedShaderFixes />;
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
