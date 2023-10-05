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
  width = 150,
  height = 35,
  type = 'button',
  onClick,
  children,
  display,
}: UIButtonProps) {
  return (
    <button
      className={styles.acgcag_ui_button}
      type={type}
      onClick={onClick}
      style={{width: width, height: height, display: display ? 'block' : 'none'}}
    >
      {children}
    </button>
  );
}
