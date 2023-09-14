import React, {useContext, useEffect} from 'react';
import {TitleCtx} from '@/hooks/TitleContext';
import PaimonIcon from '@assets/paimon-icon.png';
import ACGIcons from '../ACGIcons';
import styles from './TitleBar.module.css';
import ConfigManager from '@/config/configManager';

interface TitleBarProps {
  isSetupScreen: boolean;
}

const CONFIG = ConfigManager.setup();

export default function TitleBar({isSetupScreen}: TitleBarProps) {
  const {title, setTitle} = useContext(TitleCtx);

  useEffect(() => {
    if (!CONFIG.has_run_setup) setTitle('A Certain (Modern) GUI for a Certain Anime Game');
  }, [isSetupScreen]);

  return (
    <header className={isSetupScreen ? styles.acgcag_setup_titlebar : styles.acgcag_titlebar}>
      <div className={styles.acgcag_paimon_icon}>
        <img
          src={PaimonIcon}
          alt="Paimon Icon"
        />
      </div>
      <h1>{isSetupScreen ? title : title.toUpperCase()}</h1>
      {!isSetupScreen && (
        <div className={styles.acgcag_search_icon}>
          <ACGIcons
            iconName="search"
            iconSize={[30, 30]}
          />
        </div>
      )}
    </header>
  );
}
