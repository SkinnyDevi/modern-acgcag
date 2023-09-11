import React from 'react';
import styles from './SideBar.module.css';
import SideBarButton from './Button/SideBarButton';

export default function SideBar() {
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
