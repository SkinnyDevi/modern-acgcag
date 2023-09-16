/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useState} from 'react';
import DownloadField from '@/components/DownloadField/DownloadField';
import type {DownloadStatus} from '@/components/DownloadField/DownloadField';
import UIButton from '@/components/UIButton/UIButton';
import {restartApp} from '#preload';
import styles from './SetupScreen.module.css';
import ConfigManager from '@/config/configManager';

const CONFIG = ConfigManager.setup();

export default function SetupScreen() {
  const [startSetup, setStartSetup] = useState(false);
  const [finishSetup, setFinishSetup] = useState(false);

  const [gimiDlStatus, setGimiStatus] = useState<DownloadStatus>('Waiting');
  const [gimiExtractStatus, setGimiExtractStatus] = useState<DownloadStatus>('Waiting');
  const [modsFolderStatus, setModsFolderStatus] = useState<DownloadStatus>('Waiting');

  const [gimiDlBar, setGimiDlBar] = useState(0);
  const [gimiExtractBar, setGimiExtractBar] = useState(0);
  const [modsFolderBar, setModsFolderBar] = useState(0);

  function startACGCAGSetup() {
    setStartSetup(true);
  }

  function downloadGimi() {
    setGimiStatus('Downloading');
    setGimiDlBar(0);
  }

  function extractGimi() {
    setGimiExtractStatus('Extracting');
    setGimiExtractBar(0);
  }

  function createModsFolder() {
    setModsFolderStatus('Creating');
    setModsFolderBar(0);
  }

  function finishACGCAGSetup() {
    // CONFIG.setupComplete();
    restartApp();
  }

  return (
    <div className={styles.acgcag_setup_screen}>
      <div
        className={styles.acgcag_setup_title}
        style={{display: startSetup ? 'none' : 'flex'}}
      >
        <h1>PROGRAM SETUP INSTALLER</h1>
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
            <DownloadField
              title="Create mods folder"
              dlStatus={modsFolderStatus}
              progress={modsFolderBar}
              display
            />
          </>
        )}
      </div>
      <div
        className={styles.acgcag_setup_finish_title}
        style={{display: finishSetup ? 'flex' : 'flex'}}
      >
        <h1>Setup has finished</h1>
        <h2>Press the button below to restart the app.</h2>
        <h2>The app should close and open the Skin Manager window.</h2>
        <h2 style={{marginBottom: '25px'}}>complete installation.</h2>
        <UIButton
          display
          onClick={finishACGCAGSetup}
        >
          Finish Setup
        </UIButton>
      </div>
    </div>
  );
}
