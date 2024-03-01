import React from 'react';

import styles from './UIListContainer.module.css';

interface UIListContainerProps {
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export default function UIListContainer({children, style}: UIListContainerProps) {
  return (
    <ul
      className={styles.acgcag_ui_list_container}
      style={style}
    >
      {children}
    </ul>
  );
}
