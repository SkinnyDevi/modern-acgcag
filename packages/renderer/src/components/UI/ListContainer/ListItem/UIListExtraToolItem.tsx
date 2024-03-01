import React from 'react';

import UIButton from '@UI/Button/UIButton';
import UIProgressBar from '@UI/ProgressBar/UIProgressBar';
import styles from './UIListItem.module.css';

interface UIListExtraToolItemProps {
  toolName: string;
  description?: string;
}

export default function UIListExtraToolItem({
  toolName,
  description = '',
}: UIListExtraToolItemProps) {
  return (
    <li className={`${styles.acgcag_ui_list_item} ${styles.acgcag_ui_list_item_vertical}`}>
      <div className={styles.acgcag_ui_list_item_extra_info}>
        <div className={styles.acgcag_ui_list_item_extra_info_horizontal}>
          <h2>{toolName}</h2>
          <p>{description}</p>
        </div>
        <div className={styles.acgcag_ui_list_item_extra_info_horizontal}>
          {/* <UIButton
            display
          >
            Uninstall
          </UIButton> */}
          {/* <UIButton
            display
          >
            Run
          </UIButton> */}
          <UIButton display>Download</UIButton>
        </div>
      </div>
      <UIProgressBar progress={50} />
    </li>
  );
}
