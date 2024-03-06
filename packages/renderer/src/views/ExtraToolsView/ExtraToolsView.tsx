import React, {useCallback, useEffect, useState} from 'react';

import UIListContainer from '@UI/ListContainer/UIListContainer';
import UIListExtraToolItem from '@UI/ListContainer/ListItem/UIListExtraToolItem';
import UIToolbar from '@UI/Toolbar/UIToolbar';
import UIButton from '@UI/Button/UIButton';
import ACGIcons from '@UI/ACGIcons';
import type {ACGIconsProps} from '@/components/UI/ACGIcons';
import ACGCAG_API from '@/services/acgcagApi';
import {GBToolPost} from '@/services/gamebananaApi';
import styles from './ExtraToolsView.module.css';

export default function ExtraToolsView() {
  const [refreshIcon, setRefreshIcon] = useState<ACGIconsProps['iconName']>('check');
  const [toolList, setToolList] = useState<GBToolPost[]>([]);
  const [lastRefresh, setLastRefresh] = useState(new Date('1/1/1970'));

  const fetchExtraTools = useCallback(async () => {
    setRefreshIcon('loader');
    const tools = await ACGCAG_API.getExtraTools();
    GBToolPost.saveToCache(tools);
    setToolList(tools);
    setLastRefresh(new Date(Date.now()));
    setRefreshIcon('check');
  }, []);

  useEffect(() => {
    const cacheRetrieval = GBToolPost.recoverExtraToolsFromCache();
    if (cacheRetrieval === null) fetchExtraTools();
    else {
      setToolList(cacheRetrieval.tools);
      setLastRefresh(new Date(cacheRetrieval.last_refresh));
    }
  }, []);

  return (
    <div>
      <UIToolbar>
        <div>
          <div className={styles.acgcag_extras_refresh}>
            <UIButton
              display
              invertColors
              onClick={fetchExtraTools}
            >
              Refresh
            </UIButton>
            <ACGIcons
              iconName={refreshIcon}
              iconSize={[28, 28]}
            />
            <p>Last refresh: {lastRefresh.toLocaleString()}</p>
          </div>
        </div>
      </UIToolbar>
      <UIListContainer style={{height: '71vh'}}>
        {toolList.map(tool => {
          return (
            <UIListExtraToolItem
              tool={tool}
              key={tool.toolId}
            />
          );
        })}
      </UIListContainer>
    </div>
  );
}
