import React from 'react';

import {PreloadUtils} from '#preload';

export default function RunLauncherView() {
  return (
    <div>
      <button onClick={PreloadUtils.run3dmigoto}>Click to launch</button>
    </div>
  );
}
