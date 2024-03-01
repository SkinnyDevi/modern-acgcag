import React from 'react';

import styles from './UIListItem.module.css';

interface UIListInputItemProps {
  label?: string;
  subtitle?: string;
  size?: 's' | 'l';
  type?: React.HTMLInputTypeAttribute;
  value?: React.InputHTMLAttributes<HTMLInputElement>['value'];
  onChange?: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
}

export default function UIListInputItem({
  label,
  subtitle,
  size = 's',
  type = 'text',
  value,
  onChange,
}: UIListInputItemProps) {
  return (
    <li className={`${styles.acgcag_ui_list_item} ${styles.acgcag_ui_list_item_vertical}`}>
      <div className={styles.acgcag_ui_list_item_small_info}>
        <label>{label}</label>
        {size === 's' && (
          <input
            type={type}
            value={value}
            onChange={onChange}
          />
        )}
      </div>
      <span>{subtitle}</span>
      {size === 'l' && (
        <input
          type={type}
          value={value}
          onChange={onChange}
        />
      )}
    </li>
  );
}
