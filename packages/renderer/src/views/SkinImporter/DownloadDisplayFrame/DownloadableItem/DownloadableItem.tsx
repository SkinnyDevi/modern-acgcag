import React, {useState} from 'react';

import {FileManager} from '#preload';
import type {GBModPost} from '@/services/gamebananaApi';
import type {GBDownloadableFile} from '@/services/gamebananaApi';
import ACGIcons, {type ACGIconsProps} from '@/components/UI/ACGIcons';
import UIProgressBar from '@UI/ProgressBar/UIProgressBar';
import styles from './DownloadableItem.module.css';

interface DownloadableItemProps {
  file: GBDownloadableFile;
  mod: GBModPost;
}

export default function DownloadableItem({file, mod}: DownloadableItemProps) {
  const [disabledMod, setDisableMod] = useState(false);
  const [disabledShader, setDisableShader] = useState(false);

  const [downloading, setDownloading] = useState(false);
  const [dlProgress, setDlProgress] = useState(0);

  const [modIcon, setModIcon] = useState<ACGIconsProps['iconName']>('downloaded');
  const [shadeIcon, setShaderIcon] = useState<ACGIconsProps['iconName']>('shader');

  async function download(type: 'shader' | 'mod') {
    const isMod = type === 'mod';

    setDisableMod(true);
    setDisableShader(true);
    setDlProgress(0);
    setDownloading(true);
    if (isMod) setModIcon('loader');
    else setShaderIcon('loader');

    const dlPath = `/acgcag_mods/${type}s/${mod.itemId}/${file._sFile}`;
    let latestProgress = 0;
    await FileManager.downloadFile(file._sDownloadUrl, dlPath, e => {
      if (e.total) {
        const progress = (e.bytes / e.total) * 100;
        if (progress > latestProgress) {
          setDlProgress(progress);
          latestProgress = progress;
        }
      }
    });
    mod.saveInfoToPath(`/acgcag_mods/${type}s/${mod.itemId}`);
    setDlProgress(100);

    if (isMod) setModIcon('check');
    else setShaderIcon('check');

    setTimeout(() => {
      if (isMod && !disabledShader) setDisableShader(false);
      else if (!isMod && !disabledMod) setDisableMod(false);

      setDownloading(false);
      setDlProgress(0);
    }, 2000);
  }

  return (
    <li className={styles.acgcag_downloadable_file}>
      <button
        type="button"
        className={styles.acgcag_dl_btn}
        onClick={() => download('mod')}
        disabled={disabledMod}
      >
        <ACGIcons
          iconName={modIcon}
          iconSize={[30, 30]}
        />
      </button>
      <button
        type="button"
        className={styles.acgcag_dl_btn}
        onClick={() => download('shader')}
        disabled={disabledShader}
      >
        <ACGIcons
          iconName={shadeIcon}
          iconSize={[30, 30]}
        />
      </button>
      <span>
        {file._sFile}
        {downloading && (
          <div className={styles.acgcag_download_progress}>
            <UIProgressBar progress={dlProgress} />
          </div>
        )}
      </span>
    </li>
  );
}
