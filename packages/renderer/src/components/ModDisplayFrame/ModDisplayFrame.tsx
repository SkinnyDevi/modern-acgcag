import React from 'react';

import type {GBModPost} from '@/services/gamebananaApi';

import styles from './ModDisplayFrame.module.css';

interface ModDisplayFrameProps {
  mod: GBModPost | null;
}

export default function ModDisplayFrame({mod}: ModDisplayFrameProps) {
  if (mod === null) return <></>;

  return (
    <div className={styles.acgcag_mod_display_frame}>
      <div className={styles.mod_title}>
        <h1>{mod.name}</h1>
      </div>
      <div className={styles.mod_info}>
        <div className={styles.preview_img_frame}>
          <p>Preview Image</p>
          <img
            src={mod.previewImg}
            alt={`${mod.name} preview image`}
          />
        </div>
        <div className={styles.mod_info_frame}>
          <h1>Mod Info</h1>
          <p>
            Name: <span>{mod.name}</span>
          </p>
          <p>
            Mod ID: <span>{mod.itemId}</span>
          </p>
          <p>
            Skin type: <span>{mod.super_category}</span>
          </p>
          {mod.character !== null && (
            <p>
              Character: <span>{mod.character}</span>
            </p>
          )}
          <p>
            NSFW: <span>{mod.nsfw ? 'Yes' : 'No'}</span>
          </p>
        </div>
      </div>
      <div className={styles.download_button}>
        <button type="button">Download</button>
      </div>
    </div>
  );
}
