import React from 'react';

import type {GBDownloadableFile} from '@/services/gamebananaApi';
import styles from './DownloadableItem.module.css';
import ACGIcons from '@/components/UI/ACGIcons';

interface DownloadableItemProps {
  file: GBDownloadableFile;
}

export default function DownloadableItem({file}: DownloadableItemProps) {
  return (
    <li className={styles.acgcag_downloadable_file}>
      <button
        type="button"
        className={styles.acgcag_dl_btn}
      >
        <ACGIcons
          iconName={'downloaded'}
          iconSize={[30, 30]}
        />
      </button>
      <button
        type="button"
        className={styles.acgcag_dl_btn}
      >
        <ACGIcons
          iconName="shader"
          iconSize={[30, 30]}
        />
      </button>
      <span>{file._sFile}</span>
    </li>
  );
}
