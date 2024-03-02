import React from 'react';

import styles from './UIListItem.module.css';

interface UIListPillToggleItemProps {
  label?: string;
  subtitle?: string;
  type?: React.HTMLInputTypeAttribute;
  checked?: React.InputHTMLAttributes<HTMLInputElement>['checked'];
  onChange?: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
}

export default function UIListPillToggleItem({
  label,
  subtitle,
  checked,
  onChange,
}: UIListPillToggleItemProps) {
  function labelToToggleId() {
    return 'toggle_' + label?.split(' ').join('_').toLowerCase();
  }

  return (
    <li className={`${styles.acgcag_ui_list_item} ${styles.acgcag_ui_list_item_vertical}`}>
      <div className={styles.acgcag_ui_list_item_small_info}>
        <p>{label}</p>
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          id={labelToToggleId()}
        />
        <label
          className={styles.acgcag_pill_toggle_label}
          htmlFor={labelToToggleId()}
        >
          Toggle
        </label>
      </div>
      <span>{subtitle}</span>
    </li>
  );
}
