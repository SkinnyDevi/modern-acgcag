import React, {useState} from 'react';

import UIButton from '@UI/Button/UIButton';
import UIProgressBar from '@UI/ProgressBar/UIProgressBar';
import type {GBToolPost} from '@/services/gamebananaApi';
import styles from './UIListItem.module.css';

interface UIListExtraToolItemProps {
  tool: GBToolPost;
}

export default function UIListExtraToolItem({tool}: UIListExtraToolItemProps) {
  const [selectedFileUrl, setSelectedFileUrl] = useState<string | undefined>(undefined);
  const [displayToolbar, setDisplayToolbar] = useState(false);

  function downloadFile() {
    setDisplayToolbar(true);

    setDisplayToolbar(false);
  }

  function authorsToReadable() {
    const authorNames: string[] = [];
    for (const author of tool.authors) {
      authorNames.push(author.name);
    }

    return 'Authors: ' + authorNames.join(', ');
  }

  return (
    <li className={`${styles.acgcag_ui_list_item} ${styles.acgcag_ui_list_item_vertical}`}>
      <div className={styles.acgcag_ui_list_item_extra_info}>
        <div className={styles.acgcag_ui_list_item_extra_info_vertical}>
          <h2>{tool.name}</h2>
          <span>{authorsToReadable()}</span>
          <p>{tool.description}</p>
        </div>
        <div className={styles.acgcag_ui_list_item_extra_info_horizontal}>
          {/* <UIButton display>Uninstall</UIButton>
          <UIButton display>Run</UIButton> */}
          <select
            value={selectedFileUrl}
            onChange={e => setSelectedFileUrl(e.currentTarget.value)}
          >
            {tool.files.map(f => {
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
          >
            Download
          </UIButton>
        </div>
      </div>
      <div style={{display: displayToolbar ? 'block' : 'none'}}>
        <UIProgressBar progress={50} />
      </div>
    </li>
  );
}
