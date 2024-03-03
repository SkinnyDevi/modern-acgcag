import React, {useEffect, useState} from 'react';

import UIButton from '@UI/Button/UIButton';
import UIProgressBar from '@UI/ProgressBar/UIProgressBar';
import {GBToolPost} from '@/services/gamebananaApi';
import type {GBDownloadableFile} from '@/services/gamebananaApi';
import styles from './UIListItem.module.css';

interface UIListExtraToolItemProps {
  tool: GBToolPost;
}

const ONLY_EXECS = true;

export default function UIListExtraToolItem({tool}: UIListExtraToolItemProps) {
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | undefined>(undefined);
  const [displayToolbar, setDisplayToolbar] = useState(false);
  const [currentlyInstalled, setCurrentlyInstalled] = useState('None');

  const [availableTools, setAvailableTools] = useState<GBDownloadableFile[]>([]);

  function downloadFile() {
    setDisplayToolbar(true);
    setCurrentlyInstalled('equisde');
    setDisplayToolbar(false);
  }

  function authorsToReadable() {
    const authorNames: string[] = [];
    for (const author of tool.authors) authorNames.push(author.name);

    return 'Authors: ' + authorNames.join(', ');
  }

  useEffect(() => {
    if (ONLY_EXECS) setAvailableTools(GBToolPost.filterExecutables(tool));
    else setAvailableTools(tool.files);
  }, [tool]);

  return (
    <li className={`${styles.acgcag_ui_list_item} ${styles.acgcag_ui_list_item_vertical}`}>
      <div className={styles.acgcag_ui_list_item_extra_info}>
        <div className={styles.acgcag_ui_list_item_extra_info_vertical}>
          <h2>{tool.name}</h2>
          <span>{authorsToReadable()}</span>
          <p>{tool.description}</p>
        </div>
        <div className={styles.acgcag_ui_list_item_extra_info_vertical}>
          <div
            className={styles.acgcag_ui_list_item_extra_info_horizontal}
            style={{justifyContent: 'right'}}
          >
            {/* <UIButton display>Uninstall</UIButton>
          <UIButton display>Run</UIButton> */}
            <select
              value={selectedFileUrl}
              onChange={e => setSelectedFileUrl(e.currentTarget.value)}
            >
              {availableTools
                .sort((a, b) => b._tsDateAdded - a._tsDateAdded)
                .map(f => {
                  return (
                    <option
                      key={f._idRow}
                      value={f._sDownloadUrl}
                    >
                      {f._sFile}
                    </option>
                  );
                })}
            </select>
            <UIButton
              display
              onClick={downloadFile}
              useMargin={false}
              style={{marginLeft: '10px'}}
            >
              Download
            </UIButton>
          </div>
          <div
            className={`${styles.acgcag_ui_list_item_extra_info_horizontal} ${styles.acgcag_ui_list_item_extra_info_installed}`}
          >
            <p>Currently installed: {currentlyInstalled}</p>
          </div>
        </div>
      </div>
      <div style={{display: displayToolbar ? 'block' : 'none'}}>
        <UIProgressBar progress={50} />
      </div>
    </li>
  );
}
