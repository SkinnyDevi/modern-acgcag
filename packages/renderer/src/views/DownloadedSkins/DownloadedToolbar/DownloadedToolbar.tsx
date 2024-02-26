import React, {useState} from 'react';

import UIButton from '@UI/Button/UIButton';
import styles from './DownloadedToolbar.module.css';

export default function DownloadedToolbar() {
  const [sortAscending, setSortAscending] = useState(true);
  const [viewBlock, setViewBlock] = useState(true);

  function changeSort() {
    setSortAscending(!sortAscending);
  }

  function changeViewType() {
    setViewBlock(!viewBlock);
  }

  return (
    <div className={styles.acgcag_downloaded_toolbar}>
      <div>
        <UIButton
          display
          invertColors
        >
          All
        </UIButton>
        <UIButton
          display
          invertColors
        >
          Characters
        </UIButton>
      </div>
      <div>
        <UIButton
          display
          onClick={changeViewType}
          invertColors
        >
          View: {viewBlock ? 'Blocks' : 'List'}
        </UIButton>
        <UIButton
          display
          onClick={changeSort}
          invertColors
        >
          Sort: {sortAscending ? 'A-Z' : 'Z-A'}
        </UIButton>
      </div>
    </div>
  );
}
