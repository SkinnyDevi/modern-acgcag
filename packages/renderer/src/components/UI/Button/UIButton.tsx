import React from 'react';

import styles from './UIButton.module.css';

interface UIButtonProps {
  width?: number;
  height?: number;
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  disabled?: boolean;
  invertColors?: boolean;
  display: boolean;
  children: React.ReactNode;
  textSize?: 'l' | 'm' | 's';
  id?: string;
}

export default function UIButton({
  width,
  height,
  type = 'button',
  onClick,
  children,
  disabled,
  display,
  invertColors = false,
  textSize = 'm',
  id,
}: UIButtonProps) {
  return (
    <div
      className={`${styles.acgcag_ui_button} ${
        invertColors ? styles.acgcag_ui_button_inverted : styles.acgcag_ui_button_normal
      } ${styles[`acgcag_ui_button_${textSize}`]}`}
    >
      <button
        type={type}
        disabled={disabled}
        onClick={onClick}
        style={{
          width: width ? width : 'auto',
          height: height ? height : 'auto',
          display: display ? 'block' : 'none',
        }}
        id={id}
      >
        {children}
      </button>
    </div>
  );
}
