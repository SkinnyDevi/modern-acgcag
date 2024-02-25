import React, {useEffect} from 'react';

import {PreloadUtils} from '#preload';
import styles from './DownloadedSkins.module.css';
import {GBLocalMod} from '@/services/localModManager';

export default function DownloadedSkins() {
  useEffect(() => {
    const modIds = PreloadUtils.getModFolders();

    const mods: GBLocalMod[] = [];
    for (const modId of modIds) {
      mods.push(GBLocalMod.fromPath(`/acgcag_mods/mods/${modId}/${modId}.json`));
    }

    console.log(mods);
  }, []);

  return (
    <div className={styles.acgcag_downloaded_view}>
      <p>DOWNLOADED</p>
    </div>
  );
}
