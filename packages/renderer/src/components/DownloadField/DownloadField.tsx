import React from 'react';

import ProgressBar from '../ProgressBar/ProgressBar';

import styles from './DownloadField.module.css';

export type DownloadStatus = 'Waiting' | 'Downloading' | 'Complete' | 'Extracting' | 'Creating';

interface DownloadFieldProps {
  /**
   * Progress out of 100%.
   */
  progress?: number;
  title: string;
  dlStatus: DownloadStatus;
  display: boolean;
}

export default function DownloadField({
  title,
  dlStatus = 'Waiting',
  progress = 0,
  display,
}: DownloadFieldProps) {
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
      <ProgressBar progress={progress} />
    </div>
  );
}
