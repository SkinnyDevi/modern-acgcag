import React from 'react';

import styles from './UIToolbar.module.css';

interface UIToolbarProps {
  children: React.ReactNode;
  widthPercent?: number;
}

export default function UIToolbar({children, widthPercent}: UIToolbarProps) {
  return (
    <div
      className={styles.acgcag_ui_toolbar}
      style={{width: `${widthPercent}%`}}
    >
      {children}
    </div>
  );
}
