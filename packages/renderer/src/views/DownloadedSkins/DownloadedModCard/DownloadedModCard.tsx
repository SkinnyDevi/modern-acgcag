import React, {useContext} from 'react';

import type {GBLocalMod} from '@/services/localModManager';
import UIButton from '@UI/Button/UIButton';
import {TitleCtx} from '@/hooks/TitleContext';
import {ModDisplayCtx} from '@/hooks/ModDisplayContext';
import styles from './DownloadedModCard.module.css';

interface DownloadedModCardProps {
  mod: GBLocalMod;
}

export default function DownloadedModCard({mod}: DownloadedModCardProps) {
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
    <div className={styles.acgcag_downloaded_mod_card}>
      <div
        className={styles.acgcag_dl_mod_card_thumbnail}
        style={{
          backgroundImage: `url('modern-acgcag-files://${encodeURIComponent(
            mod.previewImgLocal,
          )}')`,
        }}
      />
      <div className={styles.acgcag_dl_mod_card_name}>
        <h2>{mod.name}</h2>
      </div>
      <div className={styles.acgcag_dl_mod_card_info}>
        <p>
          For: <span>{mod.character !== null ? mod.character : mod.super_category}</span>
        </p>
        <p>
          NSFW: <span>{capitalize(mod.nsfw.toString())}</span>
        </p>
        <p>
          ID: <span>{mod.itemId}</span>
        </p>
      </div>
      <UIButton
        display
        onClick={moveToDisplayFrame}
        invertColors
        useMargin={false}
      >
        Manage
      </UIButton>
    </div>
  );
}
