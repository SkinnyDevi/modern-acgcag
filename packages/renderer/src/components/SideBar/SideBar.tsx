import React, {useContext, useEffect} from 'react';
import type {ACGIconsProps} from '../ACGIcons';
import SideBarButton from './Button/SideBarButton';
import styles from './SideBar.module.css';
import {TitleCtx} from '@/hooks/TitleContext';

export const ButtonIds: ACGIconsProps['iconName'][] = [
  'downloaded',
  'shader',
  'import',
  'file-edit',
  'banana',
  'play',
];

export default function SideBar() {
  const {title} = useContext(TitleCtx);

  function enableAll() {
    for (const b of ButtonIds) {
      const element = document.getElementById(`acgcag-sidebar-btn-${b}`);
      if (element !== null) {
        const btn = element as HTMLButtonElement;
        btn.disabled = false;
      }
    }
  }

  function selectBtn(name: ACGIconsProps['iconName']) {
    enableAll();

    const element = document.getElementById(`acgcag-sidebar-btn-${name}`);

    if (element !== null) {
      const btn = element as HTMLButtonElement;
      btn.disabled = true;
    }
  }

  useEffect(() => {
    switch (title) {
      case 'Downloaded Skins':
        selectBtn('downloaded');
        break;
      case 'Downloaded Shader Fixes':
        selectBtn('shader');
        break;
      case 'Import Skins from GameBanana':
        selectBtn('import');
        break;
      case 'File Edit':
        selectBtn('file-edit');
        break;
      case '3DMigoto Launched':
        selectBtn('play');
        break;
    }
  }, [title]);

  return (
    <div className={styles.acgcag_sidebar}>
      <div className={styles.acgcag_sidebar_start_btns}>
        <SideBarButton
          iconName="downloaded"
          iconSize={[34, 34]}
          tabTitle="Downloaded Skins"
        />
        <SideBarButton
          iconName="shader"
          iconSize={[34, 34]}
          tabTitle="Downloaded Shader Fixes"
        />
        <SideBarButton
          iconName="import"
          iconSize={[34, 34]}
          tabTitle="Import Skins from GameBanana"
        />
        <SideBarButton
          iconName="file-edit"
          iconSize={[34, 34]}
          tabTitle="File Edit"
        />
      </div>
      <div className={styles.acgcag_sidebar_end_btns}>
        <SideBarButton
          iconName="banana"
          iconSize={[28, 28]}
          tabTitle=""
          tabChange={false}
        />
        <SideBarButton
          iconName="play"
          iconSize={[28, 28]}
          tabTitle="3DMigoto Launched"
        />
      </div>
    </div>
  );
}
