import React, {useContext} from 'react';

import ACGIcons from '@UI/ACGIcons';
import type {ACGIconsProps} from '@UI/ACGIcons';
import {TitleCtx} from '@/hooks/TitleContext';
import styles from './SideBarButton.module.css';

interface SideBarButtonProps {
  iconName: ACGIconsProps['iconName'];
  iconSize: ACGIconsProps['iconSize'];
  tabTitle: string;
  tabChange?: boolean;
  callback?: () => void;
}

export default function SideBarButton({
  iconName,
  iconSize,
  tabTitle,
  tabChange = true,
  callback,
}: SideBarButtonProps) {
  const {setTitle} = useContext(TitleCtx);

  function setTab() {
    if (callback !== undefined) callback();
    if (!tabChange) return;

    setTitle(tabTitle);
  }

  return (
    <button
      className={styles.acgcag_sidebar_btn}
      onClick={setTab}
      id={`acgcag-sidebar-btn-${iconName}`}
    >
      <ACGIcons
        iconName={iconName}
        iconSize={iconSize}
      />
    </button>
  );
}
