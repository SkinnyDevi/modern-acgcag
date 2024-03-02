import React, {useState} from 'react';

import UIButton from '@UI/Button/UIButton';
import UIToolbar from '@/components/UI/Toolbar/UIToolbar';

interface DownloadedToolbarProps {
  onSortChange: (sortAscending: boolean) => void;
}

export default function DownloadedToolbar({onSortChange}: DownloadedToolbarProps) {
  const [sortAscending, setSortAscending] = useState(true);
  const [viewBlock, setViewBlock] = useState(true);

  function changeSort() {
    onSortChange(!sortAscending);
    setSortAscending(!sortAscending);
  }

  function changeViewType() {
    setViewBlock(!viewBlock);
  }

  return (
    <UIToolbar widthPercent={97}>
      <div>
        <UIButton
          display
          invertColors
          forceSelection
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
    </UIToolbar>
  );
}
