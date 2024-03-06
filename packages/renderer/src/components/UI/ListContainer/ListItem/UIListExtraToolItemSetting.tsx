import React, {useEffect, useState} from 'react';

import UIButton from '@UI/Button/UIButton';
import {GBToolPost} from '@/services/gamebananaApi';
import styles from './UIListItem.module.css';

interface UIListExtraToolItemSetting {
  label?: string;
  subtitle?: string;
  settingKey?: string;
  type?: React.HTMLInputTypeAttribute;
  checked?: React.InputHTMLAttributes<HTMLInputElement>['checked'];
  pillOnChange?: React.InputHTMLAttributes<HTMLInputElement>['onChange'];
  selectOnChange?: (value: string) => void;
}

export default function UIListExtraToolItemSetting({
  label,
  subtitle,
  settingKey,
  checked,
  pillOnChange,
  selectOnChange,
}: UIListExtraToolItemSetting) {
  const [installedTools, setInstalledTools] = useState<string[]>([]);
  const [currentlyInstalled, setCurrentlyInstalled] = useState<string | null>(null);

  function labelToToggleId() {
    return 'toggle_' + label?.split(' ').join('_').toLowerCase();
  }

  useEffect(() => {
    const installed = GBToolPost.getInstalled();
    if (installed.length === 0) setInstalledTools(['None']);
    else setInstalledTools(installed);
  }, []);

  return (
    <li className={`${styles.acgcag_ui_list_item} ${styles.acgcag_ui_list_item_vertical}`}>
      <div className={styles.acgcag_ui_list_item_small_info}>
        <p>{label}</p>
        <div className={styles.acgcag_ui_list_item_extra_info_vertical}>
          <div
            className={styles.acgcag_ui_list_item_extra_info_horizontal}
            style={{justifyContent: 'right'}}
          >
            <select
              value={currentlyInstalled === null ? 'None' : currentlyInstalled}
              onChange={e => {
                if (selectOnChange) selectOnChange(e.currentTarget.value);
                setCurrentlyInstalled(e.currentTarget.value);
              }}
            >
              {installedTools.map((f, i) => {
                return (
                  <option
                    key={i}
                    value={f}
                  >
                    {f}
                  </option>
                );
              })}
            </select>
            <UIButton display>Run Fixer</UIButton>
            <input
              type="checkbox"
              checked={checked}
              onChange={pillOnChange}
              id={labelToToggleId()}
            />
            <label
              className={styles.acgcag_pill_toggle_label}
              htmlFor={labelToToggleId()}
            >
              Toggle
            </label>
          </div>
        </div>
      </div>
      <span>{settingKey}</span>
      <br />
      <span>{subtitle}</span>
    </li>
  );
}
