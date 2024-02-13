import React from 'react';

import UIProgressBar from '@UI/ProgressBar/UIProgressBar';
import styles from './UIDownloadField.module.css';

export type DownloadStatus = 'Waiting' | 'Downloading' | 'Complete' | 'Extracting' | 'Creating';

interface UIDownloadFieldProps {
  /**
   * Progress out of 100%.
   */
  progress?: number;
  title: string;
  dlStatus: DownloadStatus;
  display: boolean;
}

export default function UIDownloadField({
  title,
  dlStatus = 'Waiting',
  progress = 0,
  display,
}: UIDownloadFieldProps) {
  return (
    <div
      className={styles.acgcag_download_field}
      style={{display: display ? 'block' : 'none'}}
    >
      <div className={styles.acgcag_dl_field_info}>
        <p>
          {title} &nbsp; | &nbsp; Status - {dlStatus}
        </p>
      </div>
      <UIProgressBar progress={progress} />
    </div>
  );
}
