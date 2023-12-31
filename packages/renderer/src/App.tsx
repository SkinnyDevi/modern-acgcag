import React from 'react';
import Logo from '../assets/logo.svg';

const APP_VERSION = import.meta.env.VITE_APP_VERSION;

const App = () => {
  return (
    <>
      <img
        alt="Vite logo"
        src={Logo}
        width="150"
      />

      <p>
        {/* Example how to inject current app version to UI */}
        App version: {APP_VERSION}
      </p>

      <p>
        For a guide and recipes on how to configure / customize this project,
        <br />
        check out the
        <a
          href="https://github.com/cawa-93/vite-electron-builder"
          target="_blank"
          rel="noreferrer"
        >
          vite-electron-builder documentation
        </a>
        .
      </p>

      <fieldset>
        <legend>Test React Reactivity</legend>
      </fieldset>

      <fieldset>
        <legend>Test Node.js API</legend>
      </fieldset>

      <fieldset>
        <legend>Environment</legend>
      </fieldset>

      <p>
        Edit
        <code>packages/renderer/src/App.tsx</code> to test hot module replacement.
      </p>
    </>
  );
};

export default App;
