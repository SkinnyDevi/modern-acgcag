import React, {createContext, useState} from 'react';

type TitleCtxType = {
  title: string;
  setTitle: (t: string) => void;
};

/**
 * Context used to set the app's title in the Title Bar.
 */
export const TitleCtx = createContext<TitleCtxType>(Object.create(null));

export function TitleCtxProvider({children}: React.PropsWithChildren) {
  const [title, setTitle] = useState<string>('SECTION');

  return <TitleCtx.Provider value={{title, setTitle}}>{children}</TitleCtx.Provider>;
}
