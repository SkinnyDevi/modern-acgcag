import React, {useContext} from 'react';
import {TitleCtx} from '@/hooks/TitleContext';
import Downloaded from '@/views/Downloaded/Downloaded';

export default function TabManager() {
  const {title} = useContext(TitleCtx);

  function Manager() {
    switch (title) {
      case 'Downloaded Skins':
        return <Downloaded />;
      default:
        return <></>;
    }
  }

  return (
    <>
      <div className="app-bg"></div>
      <div className="content">
        <Manager />
      </div>
    </>
  );
}
