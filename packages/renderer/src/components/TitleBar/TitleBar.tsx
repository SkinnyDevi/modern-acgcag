import React, {useContext} from 'react';
import {TitleCtx} from '@/hooks/TitleContext';
import PaimonIcon from '@assets/paimon-icon.png';
import ACGIcons from '../ACGIcons';
import styles from './TitleBar.module.css';

export default function TitleBar() {
  const {title} = useContext(TitleCtx);

  return (
    <header className={styles.acgcag_titlebar}>
      <div className={styles.acgcag_paimon_icon}>
        <img
          src={PaimonIcon}
          alt="Paimon Icon"
        />
      </div>
      <h1>{title}</h1>
      <div className={styles.acgcag_search_icon}>
        <ACGIcons
          iconName="search"
          iconSize={[30, 30]}
        />
      </div>
    </header>
  );
}
