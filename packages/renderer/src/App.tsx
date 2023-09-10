import React from 'react';
import {TitleCtxProvider} from './hooks/TitleContext';
import TitleBar from './components/TitleBar/TitleBar';

import './App.css';
import SideBar from './components/SideBar/SideBar';
import TabManager from './components/TabManager/TabManager';

// const APP_VERSION = import.meta.env.VITE_APP_VERSION;

const App = () => {
  return (
    <TitleCtxProvider>
      <TitleBar />
      <div className="content-divider">
        <SideBar />
        <TabManager />
      </div>
    </TitleCtxProvider>
  );
};

export default App;
