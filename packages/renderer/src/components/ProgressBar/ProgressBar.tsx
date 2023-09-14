import React from 'react';
import styles from './ProgressBar.module.css';

interface ProgressBarProps {
  /**
   * Progress out of 100%.
   */
  progress?: number;
}

export default function ProgressBar({progress = 0}: ProgressBarProps) {
  return (
    <div className={styles.acgcag_progress_bar}>
      <div style={{width: `${progress}%`}}></div>
    </div>
  );
}
