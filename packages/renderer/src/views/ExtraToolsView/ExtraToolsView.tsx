import React, {useState} from 'react';

import UIListContainer from '@/components/UI/ListContainer/UIListContainer';
import UIListExtraToolItem from '@/components/UI/ListContainer/ListItem/UIListExtraToolItem';
import UIToolbar from '@/components/UI/Toolbar/UIToolbar';
import UIButton from '@/components/UI/Button/UIButton';
import ACGIcons from '@/components/UI/ACGIcons';
import type {ACGIconsProps} from '@/components/UI/ACGIcons';
import styles from './ExtraToolsView.module.css';

export default function ExtraToolsView() {
  const [refreshIcon, setRefreshIcon] = useState<ACGIconsProps['iconName']>('check');

  function refreshTools() {
    setRefreshIcon('loader');

    setTimeout(() => setRefreshIcon('check'), 1500);
  }

  return (
    <div>
      <UIToolbar>
        <div>
          <div className={styles.acgcag_extras_refresh}>
            <UIButton
              display
              invertColors
              onClick={refreshTools}
            >
              Refresh
            </UIButton>
            <ACGIcons
              iconName={refreshIcon}
              iconSize={[28, 28]}
            />
          </div>
        </div>
      </UIToolbar>
      <UIListContainer style={{height: '71vh'}}>
        <UIListExtraToolItem
          toolName="Updater tool"
          description="This is a tool that fixes all skins for 4.1"
        />
      </UIListContainer>
    </div>
  );
}
