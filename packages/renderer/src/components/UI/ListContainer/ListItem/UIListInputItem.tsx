import React from 'react';

import styles from './UIListItem.module.css';

interface UIListInputItemProps {
  label?: string;
  subtitle?: string;
  size?: 's' | 'l';
  value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
  onChange?: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
}

export default function UIListInputItem({
  label,
  subtitle,
  size = 's',
  value,
  onChange,
}: UIListInputItemProps) {
  return (
    <li className={`${styles.acgcag_ui_list_item} ${styles.acgcag_ui_list_item_vertical}`}>
      <div className={styles.acgcag_ui_list_item_small_info}>
        <p>{label}</p>
        {size === 's' && (
          <input
            type="text"
            value={value}
            onChange={onChange}
          />
        )}
      </div>
      <span>{subtitle}</span>
      {size === 'l' && (
        <input
          type="text"
          value={value}
          onChange={onChange}
        />
      )}
    </li>
  );
}
