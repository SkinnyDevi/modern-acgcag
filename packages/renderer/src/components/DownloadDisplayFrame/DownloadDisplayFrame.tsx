import React from 'react';
import type {GBModPost} from '@/services/gamebananaApi';
import styles from './DownloadDisplayFrame.module.css';
import DownloadableItem from './DownloadableItem/DownloadableItem';
import ACGIcons from '@UI/ACGIcons';
import UIButton from '@UI/Button/UIButton';

interface DownloadDisplayFrameProps {
  mod: GBModPost | null;
  returnCallback: () => void;
}

export default function DownloadDisplayFrame({mod, returnCallback}: DownloadDisplayFrameProps) {
  if (!mod) return <></>;

  return (
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
      <div className={styles.acgcag_download_legend}>
        <UIButton
          display
          onClick={returnCallback}
          invertColors
          id="acgcag_dl_go_back"
        >
          &lt;- Go back
        </UIButton>
        <div className={styles.acgcag_download_icon_legend}>
          <span>Legend:</span>
          <div style={{textDecoration: 'auto'}}>
            <ACGIcons
              iconName={'downloaded'}
              iconSize={[30, 30]}
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
        <UIButton
          display
          disabled
        >
          &lt;- Go back
        </UIButton>
      </div>
    </div>
  );
}
