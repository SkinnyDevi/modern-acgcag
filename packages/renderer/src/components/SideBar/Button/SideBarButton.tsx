import React from 'react';
import type {ACGIconsProps} from '@/components/ACGIcons';
import ACGIcons from '@/components/ACGIcons';
import styles from './SideBarButton.module.css';

export default function SideBarButton({iconName, iconSize}: ACGIconsProps) {
  return (
    <div className={styles.acgcag_sidebar_btn}>
      <ACGIcons
        iconName={iconName}
        iconSize={iconSize}
      />
    </div>
  );
}
