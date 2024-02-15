import React from 'react';
import type {GBModPost} from '@/services/gamebananaApi';
import styles from './DownloadDisplayFrame.module.css';
import DownloadableItem from './DownloadableItem/DownloadableItem';
import ACGIcons from '../UI/ACGIcons';

interface DownloadDisplayFrameProps {
  display: boolean;
  mod: GBModPost | null;
}

export default function DownloadDisplayFrame({display, mod}: DownloadDisplayFrameProps) {
  if (!mod) return <></>;

  return (
    display && (
      <div className={styles.acgcag_download_display_frame}>
        <h3>Choose your download</h3>
        <ul>
          {mod.files.map(f => {
            return (
              <DownloadableItem
                file={f}
                key={f._idRow}
              />
            );
          })}
        </ul>
        <div className={styles.acgcag_download_icon_legend}>
          <span>Legend:</span>
          <div style={{textDecoration: 'auto'}}>
            <ACGIcons
              iconName={'mod'}
              iconSize={[35, 35]}
            />
            Download as mod
          </div>
          <div style={{textDecoration: 'auto'}}>
            <ACGIcons
              iconName={'shader'}
              iconSize={[30, 30]}
            />
            Download as shader
          </div>
        </div>
      </div>
    )
  );
}
