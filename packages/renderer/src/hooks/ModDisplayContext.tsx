import React, {createContext, useState} from 'react';
import type {GBLocalMod} from '@/services/localModManager';

type ModDisplayCtxType = {
  mod: GBLocalMod | null;
  setMod: (t: GBLocalMod | null) => void;
};

/**
 * Context used to set the mod to display.
 */
export const ModDisplayCtx = createContext<ModDisplayCtxType>(Object.create(null));

export function ModDisplayCtxProvider({children}: React.PropsWithChildren) {
  const [mod, setMod] = useState<GBLocalMod | null>(null);

  return <ModDisplayCtx.Provider value={{mod, setMod}}>{children}</ModDisplayCtx.Provider>;
}
