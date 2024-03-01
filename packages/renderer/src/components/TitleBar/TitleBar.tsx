import React, {useContext, useEffect} from 'react';

import {TitleCtx} from '@/hooks/TitleContext';
import {enableAllSidebarButtons} from '../SideBar/SideBar';
import PaimonIcon from '@assets/icons/paimon-icon.png';
import ConfigManager from '@/config/configManager';
import ACGIcons from '../UI/ACGIcons';
import styles from './TitleBar.module.css';

interface TitleBarProps {
  isSetupScreen: boolean;
}

const CONFIG = ConfigManager.setup();

export default function TitleBar({isSetupScreen}: TitleBarProps) {
  const {title, setTitle} = useContext(TitleCtx);

  function openSettings() {
    if (title !== 'settings') {
      setTitle('settings');
      enableAllSidebarButtons();
    }
  }

  useEffect(() => {
    if (!CONFIG.has_run_setup) setTitle('A Certain (Modern) GUI for a Certain Anime Game');
  }, [isSetupScreen]);

  return (
    <header className={isSetupScreen ? styles.acgcag_setup_titlebar : styles.acgcag_titlebar}>
      <div className={styles.acgcag_paimon_icon}>
        <img
          src={PaimonIcon}
          alt="Paimon Icon"
          draggable="false"
        />
      </div>
      <h1>{isSetupScreen ? title : title.toUpperCase()}</h1>
      {!isSetupScreen && (
        <button
          type="button"
          className={styles.acgcag_settings_button}
          onClick={openSettings}
        >
          <ACGIcons
            iconName="settings"
            iconSize={[30, 30]}
          />
        </button>
      )}
    </header>
  );
}
