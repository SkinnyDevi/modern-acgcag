import React, {useEffect, useState} from 'react';
import {TitleCtxProvider} from './hooks/TitleContext';
import TitleBar from './components/TitleBar/TitleBar';
import SideBar from './components/SideBar/SideBar';
import TabManager from './components/TabManager/TabManager';
import ConfigManager from './config/configManager';
import './App.css';

// const APP_VERSION = import.meta.env.VITE_APP_VERSION;

const CONFIG = ConfigManager.setup();

const App = () => {
  const [loadApp, setLoadApp] = useState(true);

  useEffect(() => {
    setLoadApp(CONFIG.has_run_setup);
  }, []);

  return (
    <TitleCtxProvider>
      <TitleBar />
      {loadApp ? (
        <div className="content-divider">
          <SideBar />
          <TabManager />
        </div>
      ) : (
        <p>Setup</p>
      )}
    </TitleCtxProvider>
  );
};

export default App;
