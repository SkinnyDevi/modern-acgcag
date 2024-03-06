import React, {useEffect, useState} from 'react';

import UIListContainer from '@/components/UI/ListContainer/UIListContainer';
import UIListInputItem from '@/components/UI/ListContainer/ListItem/UIListInputItem';
import ConfigManager from '@/config/configManager';
import UIToolbar from '@/components/UI/Toolbar/UIToolbar';
import ACGIcons from '@/components/UI/ACGIcons';
import type {ACGIconsProps} from '@/components/UI/ACGIcons';
import UIListPillToggleItem from '@/components/UI/ListContainer/ListItem/UIListPillToggleItem';
import UIListExtraToolItemSetting from '@/components/UI/ListContainer/ListItem/UIListExtraToolItemSetting';
import styles from './SettingsView.module.css';

const CONFIG = ConfigManager.setup();

export default function SettingsView() {
  const [initialSet, setInitialSet] = useState(false);
  const [dynamicConfig, setDynConfig] = useState(CONFIG.info());

  const [genshinPath, setGenshinPath] = useState(CONFIG.genshin_impact_path);
  const [toggleNsfwBlur, setToggleNsfwBlur] = useState(CONFIG.blur_nsfw);
  const [runFixerOnInstall, setRunFixerOnInstall] = useState(CONFIG.autorun_version_fixer);
  const [fixerFileName, setFixerFileName] = useState(CONFIG.exec_version_fixer_file_name);

  const [savedText, setSavedText] = useState('Settings Saved');
  const [savedIcon, setSavedIcon] = useState<ACGIconsProps['iconName']>('check');

  function generateSubtitle(configKey: string, inputType: string) {
    return `Input type: ${inputType} | Config key: ${configKey}`;
  }

  function updateConfig() {
    setSavedText('Saving Settings...');
    setSavedIcon('loader');
    const cfg = {...dynamicConfig};
    cfg.genshin_impact_path = genshinPath;
    cfg.blur_nsfw = toggleNsfwBlur;
    cfg.autorun_version_fixer = runFixerOnInstall;
    cfg.exec_version_fixer_file_name = fixerFileName === 'None' ? null : fixerFileName;

    setDynConfig(cfg);
  }

  useEffect(() => {
    setTimeout(() => setInitialSet(true), 855);
  }, []);

  useEffect(() => {
    if (initialSet) updateConfig();
  }, [genshinPath, toggleNsfwBlur, runFixerOnInstall, fixerFileName]);

  useEffect(() => {
    if (initialSet) {
      const updateTimer = setTimeout(() => {
        CONFIG.fromConfig(dynamicConfig);
        CONFIG.save();
        setSavedText('Settings Saved');
        setSavedIcon('check');
      }, 850);

      return () => clearTimeout(updateTimer);
    }
  }, [dynamicConfig]);

  return (
    <div className={styles.acgcag_settings_pane}>
      <UIToolbar>
        <div></div>
        <div>
          <div className={styles.acgcag_settings_saved_text}>
            <ACGIcons
              iconName={savedIcon}
              iconSize={[25, 25]}
            />
            <p>{savedText}</p>
          </div>
        </div>
        <div></div>
      </UIToolbar>
      <UIListContainer style={{height: '72vh'}}>
        <UIListInputItem
          label="Genshin Impact executable path"
          subtitle={generateSubtitle('genshin_impact_path', 'text')}
          size="l"
          value={genshinPath}
          onChange={e => setGenshinPath(e.currentTarget.value)}
        />
        <UIListPillToggleItem
          label="Blur NSFW thumbnail images"
          subtitle={generateSubtitle('blur_nsfw', 'true / false')}
          checked={toggleNsfwBlur}
          onChange={e => setToggleNsfwBlur(e.currentTarget.checked)}
        />
        <UIListExtraToolItemSetting
          label="Run version fixer on any 'mod' install"
          settingKey={generateSubtitle('autorun_version_fixer', 'true / false')}
          subtitle={
            'When on, this will run the version fixer installed (if any) every time a mod is installed. Disabled if no fixer is installed.'
          }
          checked={runFixerOnInstall}
          pillOnChange={e => setRunFixerOnInstall(e.currentTarget.checked)}
          selectOnChange={v => setFixerFileName(v)}
        />
      </UIListContainer>
    </div>
  );
}
