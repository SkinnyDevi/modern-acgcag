import React, {useContext, useEffect, useState} from 'react';

import type {GBLocalMod} from '@/services/localModManager';
import UIButton from '@UI/Button/UIButton';
import {TitleCtx} from '@/hooks/TitleContext';
import {ModDisplayCtx} from '@/hooks/ModDisplayContext';
import ConfigManager from '@/config/configManager';
import styles from './DownloadedModCard.module.css';

interface DownloadedModCardProps {
  mod: GBLocalMod;
}

const CONFIG = ConfigManager.setup();

export default function DownloadedModCard({mod}: DownloadedModCardProps) {
  const {setTitle} = useContext(TitleCtx);
  const {setMod} = useContext(ModDisplayCtx);

  const [blurThumb, setBlurThumb] = useState(false);

  function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function moveToDisplayFrame() {
    setMod(mod);
    setTitle('mod manager');
  }

  useEffect(() => {
    setBlurThumb(CONFIG.blur_nsfw && mod.nsfw);
  }, [mod, CONFIG.blur_nsfw]);

  return (
    <div className={styles.acgcag_downloaded_mod_card}>
      <div className={styles.acgcag_dl_mod_card_thumbnail}>
        <div>
          <UIButton
            display={mod.nsfw && blurThumb}
            invertColors
            width={120}
            onClick={() => setBlurThumb(false)}
          >
            View Image
          </UIButton>
        </div>
        <div
          style={{
            backgroundImage: `url('modern-acgcag-files://${encodeURIComponent(
              mod.previewImgLocal,
            )}')`,
            filter: blurThumb ? 'blur(5px)' : 'none',
            WebkitFilter: blurThumb ? 'blur(5px)' : 'none',
          }}
        />
      </div>

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
