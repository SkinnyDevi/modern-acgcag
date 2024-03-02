import React, {useEffect, useState} from 'react';

import {PreloadUtils} from '#preload';
import {GBLocalMod} from '@/services/localModManager';
import DownloadedToolbar from './DownloadedToolbar/DownloadedToolbar';
import DownloadedModCard from './DownloadedModCard/DownloadedModCard';
import styles from './DownloadedSkins.module.css';

export default function DownloadedSkins() {
  const [modList, setModList] = useState<GBLocalMod[] | null>(null);

  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    const modIds = PreloadUtils.getModFolders();
    if (modIds === null) return;

    const mods: GBLocalMod[] = [];
    for (const modId of modIds) {
      mods.push(GBLocalMod.fromPath(`/acgcag_mods/mods/${modId}/${modId}.json`));
    }

    setModList(mods);
  }, []);

  return (
    <div className={styles.acgcag_downloaded_view}>
      <DownloadedToolbar onSortChange={changedSort => setSortAscending(changedSort)} />

      <div className={styles.acgcag_mod_container}>
        {modList !== null &&
          modList
            .sort((a, b) => (sortAscending ? 1 : -1) * a.name.localeCompare(b.name))
            .map(m => {
              return (
                <DownloadedModCard
                  key={m.itemId}
                  mod={m}
                />
              );
            })}
      </div>
    </div>
  );
}
