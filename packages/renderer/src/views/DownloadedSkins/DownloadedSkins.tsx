import React, {useEffect, useState} from 'react';

import {PreloadUtils} from '#preload';
import {GBLocalMod} from '@/services/localModManager';
import DownloadedToolbar from './DownloadedToolbar/DownloadedToolbar';
import DownloadedModFrame from './DownloadedModFrame/DownloadedModFrame';
import styles from './DownloadedSkins.module.css';

export default function DownloadedSkins() {
  const [modList, setModList] = useState<GBLocalMod[] | null>(null);

  useEffect(() => {
    const modIds = PreloadUtils.getModFolders();

    const mods: GBLocalMod[] = [];
    for (const modId of modIds) {
      mods.push(GBLocalMod.fromPath(`/acgcag_mods/mods/${modId}/${modId}.json`));
    }

    setModList(mods);
  }, []);

  return (
    <div className={styles.acgcag_downloaded_view}>
      <DownloadedToolbar />

      <div className={styles.acgcag_mod_container}>
        {modList !== null ? (
          modList.map(m => {
            return (
              <DownloadedModFrame
                key={m.itemId}
                mod={m}
              />
            );
          })
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
