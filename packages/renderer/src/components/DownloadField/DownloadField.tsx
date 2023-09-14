import React from 'react';
import ProgressBar from '../ProgressBar/ProgressBar';
import styles from './DownloadField.module.css';

export type DownloadStatus = 'Waiting' | 'Downloading' | 'Complete';

interface DownloadFieldProps {
  /**
   * Progress out of 100%.
   */
  progress?: number;
  title: string;
  dlStatus: DownloadStatus;
}

export default function DownloadField({
  title,
  dlStatus = 'Waiting',
  progress = 0,
}: DownloadFieldProps) {
  return (
    <div className={styles.acgcag_download_field}>
      <div className={styles.acgcag_dl_field_info}>
        <p>
          {title} &nbsp; | &nbsp; Status - {dlStatus}
        </p>
      </div>
      <ProgressBar progress={progress} />
    </div>
  );
}
