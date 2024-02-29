import React, {useContext} from 'react';

import type {GBLocalMod} from '@/services/localModManager';
import {TitleCtx} from '@/hooks/TitleContext';
import UIButton from '@UI/Button/UIButton';
import {ModDisplayCtx} from '@/hooks/ModDisplayContext';
import styles from './DownloadedModFrame.module.css';

interface DownloadedModFrameProps {
  mod: GBLocalMod;
}

export default function DownloadedModFrame({mod}: DownloadedModFrameProps) {
  const {setTitle} = useContext(TitleCtx);
  const {setMod} = useContext(ModDisplayCtx);

  function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function moveToDisplayFrame() {
    setMod(mod);
    setTitle('mod manager');
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
      <UIButton
        display
        onClick={moveToDisplayFrame}
        invertColors
      >
        Manage
      </UIButton>
    </div>
  );
}
