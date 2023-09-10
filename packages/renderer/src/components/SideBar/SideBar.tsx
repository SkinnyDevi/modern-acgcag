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
        />
        <SideBarButton
          iconName="shader"
          iconSize={[34, 34]}
        />
        <SideBarButton
          iconName="import"
          iconSize={[34, 34]}
        />
        <SideBarButton
          iconName="file-edit"
          iconSize={[34, 34]}
        />
      </div>
      <div className={styles.acgcag_sidebar_end_btns}>
        <SideBarButton
          iconName="play"
          iconSize={[28, 28]}
        />
        <SideBarButton
          iconName="play"
          iconSize={[28, 28]}
        />
      </div>
    </div>
  );
}
