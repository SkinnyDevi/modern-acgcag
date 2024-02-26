import React, {useState} from 'react';

import ACGIcons from '@/components/UI/ACGIcons';
import type {ACGIconsProps} from '@/components/UI/ACGIcons';
import type {FileEntry} from '../ModDisplayFrame';

interface FileTableEntryProps {
  file: FileEntry;
  onDelete: () => void;
}

export default function FileTableEntry({file, onDelete}: FileTableEntryProps) {
  const [icon, setIcon] = useState<ACGIconsProps['iconName']>('error');
  const [disableBtn, setDisableBtn] = useState(false);

  function handleActivation() {
    setDisableBtn(true);
    setIcon('loader');

    file.isInstalled = !file.isInstalled;
    setTimeout(() => {
      setDisableBtn(false);
      setIcon(file.isInstalled ? 'check' : 'error');
    }, 2000);
  }

  return (
    <tr>
      <td>{file.fileName}</td>
      <td style={{textAlign: 'center'}}>
        <button
          type="button"
          onClick={handleActivation}
          disabled={disableBtn}
        >
          <ACGIcons
            iconName={icon}
            iconSize={[25, 25]}
          />
        </button>
      </td>
      <td style={{textAlign: 'center'}}>
        <button
          type="button"
          disabled={disableBtn}
          onClick={onDelete}
        >
          <ACGIcons
            iconName={'trash'}
            iconSize={[25, 25]}
          />
        </button>
      </td>
    </tr>
  );
}
