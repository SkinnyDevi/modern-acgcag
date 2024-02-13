import React from 'react';

import styles from './UIButton.module.css';

interface UIButtonProps {
  width?: number;
  height?: number;
  onClick?: React.ButtonHTMLAttributes<HTMLButtonElement>['onClick'];
  type?: React.ButtonHTMLAttributes<HTMLButtonElement>['type'];
  display: boolean;
  children: React.ReactNode;
}

export default function UIButton({
  width,
  height,
  type = 'button',
  onClick,
  children,
  display,
}: UIButtonProps) {
  return (
    <div className={styles.acgcag_ui_button}>
      <button
        type={type}
        onClick={onClick}
        style={{
          width: width ? width : 'auto',
          height: height ? height : 'auto',
          display: display ? 'block' : 'none',
        }}
      >
        {children}
      </button>
    </div>
  );
}
