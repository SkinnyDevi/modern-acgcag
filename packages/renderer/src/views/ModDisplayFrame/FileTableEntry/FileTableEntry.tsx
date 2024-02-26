import React, {useState} from 'react';

import type {GBLocalMod} from '@/services/localModManager';
import ACGIcons from '@/components/UI/ACGIcons';
import type {ACGIconsProps} from '@/components/UI/ACGIcons';
import type {FileEntry} from '../ModDisplayFrame';

interface FileTableEntryProps {
  file: FileEntry;
  mod: GBLocalMod;
  isInstalled: boolean;
  onDelete: () => void;
  onActivationChange: () => void;
}

export default function FileTableEntry({
  file,
  mod,
  isInstalled,
  onDelete,
  onActivationChange,
}: FileTableEntryProps) {
  const [icon, setIcon] = useState<ACGIconsProps['iconName']>(isInstalled ? 'check' : 'error');
  const [disableBtn, setDisableBtn] = useState(false);

  async function handleActivation() {
    setDisableBtn(true);
    setIcon('loader');

    if (!file.isInstalled) await mod.installFileEntry(file);
    else mod.uninstallFileEntry(file);
    file.isInstalled = !file.isInstalled;
    setTimeout(() => {
      onActivationChange();
      setDisableBtn(false);
      setIcon(file.isInstalled ? 'check' : 'error');
    }, 1000);
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
