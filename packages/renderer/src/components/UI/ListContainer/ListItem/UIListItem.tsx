import React from 'react';

import styles from './UIListItem.module.css';

interface UIListItemProps {
  children: React.ReactNode;
}

export default function UIListItem({children}: UIListItemProps) {
  return (
    <li className={styles.acgcag_ui_list_item}>
      <p>{children}</p>
    </li>
  );
}
