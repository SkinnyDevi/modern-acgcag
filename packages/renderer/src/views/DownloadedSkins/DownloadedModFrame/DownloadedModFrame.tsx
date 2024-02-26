import React from 'react';

import type {GBLocalMod} from '@/services/localModManager';
import UIButton from '@UI/Button/UIButton';
import styles from './DownloadedModFrame.module.css';

interface DownloadedModFrameProps {
  mod: GBLocalMod;
}

export default function DownloadedModFrame({mod}: DownloadedModFrameProps) {
  function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  return (
    <div className={styles.acgcag_downloaded_mod_frame}>
      <h2>{mod.name}</h2>
      <div className={styles.acgcag_mod_info_frame}>
        <img
          src={`modern-acgcag-files://${encodeURIComponent(mod.previewImgLocal)}`}
          alt={`${mod.name} preview`}
          draggable={false}
        />
        <div className={styles.acgcag_mod_info}>
          <p>
            ID: <span>{mod.itemId}</span>
          </p>
          <p>
            For: <span>{mod.character !== null ? mod.character : mod.super_category}</span>
          </p>
          <p>
            NSFW: <span>{capitalize(mod.nsfw.toString())}</span>
          </p>
        </div>
      </div>
      <UIButton display>Manage</UIButton>
    </div>
  );
}
