import React from 'react';

import styles from './UIProgressBar.module.css';

interface UIProgressBarProps {
  /**
   * Progress out of 100%.
   */
  progress?: number;
}

export default function UIProgressBar({progress = 0}: UIProgressBarProps) {
  return (
    <div className={styles.acgcag_progress_bar}>
      <div style={{width: `${progress}%`}}></div>
    </div>
  );
}
