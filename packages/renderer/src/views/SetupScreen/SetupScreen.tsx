import React from 'react';
import styles from './SetupScreen.module.css';
import DownloadField from '@/components/DownloadField/DownloadField';

export default function SetupScreen() {
  return (
    <div className={styles.acgcag_setup_screen}>
      <div className={styles.acgcag_download_fields}>
        <DownloadField
          title="Download GIMI"
          dlStatus="Waiting"
          progress={50}
        />
        <DownloadField
          title="Extract GIMI"
          dlStatus="Waiting"
          progress={50}
        />
        <DownloadField
          title="Create mods folder"
          dlStatus="Waiting"
          progress={50}
        />
      </div>
    </div>
  );
}
