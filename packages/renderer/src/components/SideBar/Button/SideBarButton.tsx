import React, {useContext} from 'react';
import type {ACGIconsProps} from '@/components/ACGIcons';
import ACGIcons from '@/components/ACGIcons';
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

  function hoverButton(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, enter: boolean) {
    const btn = e.target as HTMLButtonElement;

    if (enter) btn.classList.add(styles.acgcag_sidebar_btn_hover);
    else btn.classList.remove(styles.acgcag_sidebar_btn_hover);
  }

  function setTab() {
    if (callback !== undefined) callback();
    if (!tabChange) return;

    setTitle(tabTitle);
  }

  return (
    <button
      onMouseEnter={e => hoverButton(e, true)}
      onMouseLeave={e => hoverButton(e, false)}
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
