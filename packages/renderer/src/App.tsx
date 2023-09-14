import React, {useEffect, useState} from 'react';
import {TitleCtxProvider} from './hooks/TitleContext';
import TitleBar from './components/TitleBar/TitleBar';
import SideBar from './components/SideBar/SideBar';
import TabManager from './components/TabManager/TabManager';
import ConfigManager from './config/configManager';
import './App.css';
import SetupScreen from './views/SetupScreen/SetupScreen';

// const APP_VERSION = import.meta.env.VITE_APP_VERSION;

const CONFIG = ConfigManager.setup();

const App = () => {
  const [loadApp, setLoadApp] = useState(true);

  useEffect(() => {
    setLoadApp(!CONFIG.has_run_setup);
  }, []);

  return (
    <TitleCtxProvider>
      <TitleBar isSetupScreen={!loadApp} />
      {loadApp ? (
        <div className="content-divider">
          <SideBar />
          <TabManager />
        </div>
      ) : (
        <SetupScreen />
      )}
    </TitleCtxProvider>
  );
};

export default App;
