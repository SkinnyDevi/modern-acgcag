import React, {useState} from 'react';

import {PreloadUtils, SetupHelpers} from '#preload';
import ConfigManager from '@/config/configManager';
import DownloadField from '@/components/DownloadField/DownloadField';
import UIButton from '@/components/UIButton/UIButton';
import styles from './SetupScreen.module.css';

import type {DownloadStatus} from '@/components/DownloadField/DownloadField';

const CONFIG = ConfigManager.setup();
const DL_URL =
  'https://github.com/SilentNightSound/GI-Model-Importer/releases/download/v7.0/3dmigoto-GIMI-for-playing-mods.zip';

export default function SetupScreen() {
  const [startSetup, setStartSetup] = useState(false);
  const [finishSetup, setFinishSetup] = useState(false);

  const [gimiDlStatus, setGimiStatus] = useState<DownloadStatus>('Waiting');
  const [gimiDlBar, setGimiDlBar] = useState(0);

  const [gimiExtractBar, setGimiExtractBar] = useState(0);
  const [gimiExtractStatus, setGimiExtractStatus] = useState<DownloadStatus>('Waiting');

  async function startACGCAGSetup() {
    setStartSetup(true);
    await downloadGimi();
    await extractGimi();
    setFinishSetup(true);
    CONFIG.setupComplete();
  }

  async function downloadGimi() {
    setGimiStatus('Downloading');

    await PreloadUtils.downloadFile(DL_URL, '/3dmigoto_download.zip', e => {
      if (e.total) setGimiDlBar((e.bytes / e.total) * 100);
    });
    setGimiDlBar(100);
    setGimiStatus('Complete');
  }

  async function extractGimi() {
    setGimiExtractStatus('Extracting');
    setGimiExtractBar(0);
    await SetupHelpers.extractGimi();
    setGimiExtractBar(100);
    setGimiExtractStatus('Complete');
  }

  return (
    <div className={styles.acgcag_setup_screen}>
      <div
        className={styles.acgcag_setup_title}
        style={{display: startSetup ? 'none' : 'flex'}}
      >
        <h1>PROGRAM SETUP INSTALLER</h1>
        <h2>This setup shows up on first installation or files are missing.</h2>
        <UIButton
          onClick={startACGCAGSetup}
          display
        >
          Start Setup
        </UIButton>
      </div>
      <div className={styles.acgcag_download_fields}>
        {startSetup && (
          <>
            <DownloadField
              title="Download GIMI"
              dlStatus={gimiDlStatus}
              progress={gimiDlBar}
              display
            />
            <DownloadField
              title="Extract GIMI"
              dlStatus={gimiExtractStatus}
              progress={gimiExtractBar}
              display
            />
          </>
        )}
      </div>
      <div
        className={styles.acgcag_setup_finish_title}
        style={{display: finishSetup ? 'flex' : 'none'}}
      >
        <h1>Setup has finished</h1>
        <h2>Press the button below to restart the app.</h2>
        <h2>The app should close and open the Skin Manager window.</h2>
        <h2 style={{marginBottom: '25px'}}>complete installation.</h2>
        <UIButton
          display
          onClick={PreloadUtils.restartApp}
        >
          Finish Setup
        </UIButton>
      </div>
    </div>
  );
}
