import React, {useState} from 'react';

import {PreloadUtils, SetupHelpers, FileManager} from '#preload';
import ConfigManager from '@/config/configManager';
import UIDownloadField, {type DownloadStatus} from '@UI/DownloadField/UIDownloadField';
import UIButton from '@UI/Button/UIButton';
import styles from './SetupScreen.module.css';

const CONFIG = ConfigManager.setup();
const DL_URL =
  'https://github.com/SilentNightSound/GI-Model-Importer/releases/download/v7.0/3dmigoto-GIMI-for-playing-mods.zip';

let setupHasErrors = true;
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

    try {
      await FileManager.downloadFile(DL_URL, '/3dmigoto_download.zip', e => {
        if (e.total) setGimiDlBar((e.bytes / e.total) * 100);
      });
      setGimiDlBar(100);
      setGimiStatus('Complete');
      setupHasErrors = false;
    } catch (err) {
      setGimiStatus('Failed');
      console.error(err);
    }
  }

  async function extractGimi() {
    if (setupHasErrors) {
      setGimiExtractStatus('Failed');
      return;
    }

    setGimiExtractStatus('Extracting');
    setGimiExtractBar(0);
    try {
      await SetupHelpers.extractGimi();
      setGimiExtractBar(100);
      setGimiExtractStatus('Complete');
      setupHasErrors = false;
    } catch (err) {
      setGimiExtractStatus('Failed');
      setupHasErrors = true;
      console.error(err);
    }
  }

  return (
    <div className={styles.acgcag_setup_screen}>
      <div
        className={styles.acgcag_setup_title}
        style={{display: startSetup ? 'none' : 'flex'}}
      >
        <h1>PROGRAM SETUP INSTALLER</h1>
        <h2>This setup shows up on the first installation or if files are missing.</h2>
        <UIButton
          onClick={startACGCAGSetup}
          width={150}
          height={35}
          display
        >
          Start Setup
        </UIButton>
      </div>
      <div
        className={styles.acgcag_download_fields}
        style={{height: finishSetup ? '40%' : '50%'}}
      >
        {startSetup && (
          <>
            <UIDownloadField
              title="Download GIMI"
              dlStatus={gimiDlStatus}
              progress={gimiDlBar}
              display
            />
            <UIDownloadField
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
        {setupHasErrors ? (
          <>
            <h1>Oh no! The setup appears to have failed.</h1>
            <h2>
              This doesn&apos;t happent normally. <br />
              Press the button below to restart the setup process. <br />
              The app will close and open restared.
            </h2>
            <UIButton
              display
              onClick={PreloadUtils.restartApp}
              width={200}
              height={50}
              invertColors
            >
              Close and restart setup
            </UIButton>
          </>
        ) : (
          <>
            <h1>Setup has finished!</h1>
            <h2>
              Press the button below to restart the app. <br />
              The app should close and open the Skin Manager window.
            </h2>
            <UIButton
              display
              onClick={PreloadUtils.restartApp}
              width={150}
              height={35}
              invertColors
            >
              Finish Setup
            </UIButton>
          </>
        )}
      </div>
    </div>
  );
}
