import React, {useContext, useEffect, useState} from 'react';

import {ModDisplayCtx} from '@/hooks/ModDisplayContext';
import {TitleCtx} from '@/hooks/TitleContext';
import toolbarStyles from '@/views/DownloadedSkins/DownloadedToolbar/DownloadedToolbar.module.css';
import UIButton from '@/components/UI/Button/UIButton';
import FileTableEntry from './FileTableEntry/FileTableEntry';
import styles from './ModDisplayFrame.module.css';

export type FileEntry = {
  fileName: string;
  isInstalled: boolean;
};

export default function ModDisplayFrame() {
  const {mod, setMod} = useContext(ModDisplayCtx);
  const {setTitle} = useContext(TitleCtx);

  const [fileList, setFileList] = useState<FileEntry[]>([]);

  function returnToMods() {
    setTitle('downloaded skins');
    setMod(null);
  }

  function capitalize(s: string) {
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  function deleteEntry(fe: FileEntry) {
    const modlist = [...fileList];
    const entry = fileList.indexOf(fe);
    modlist.splice(entry, 1);

    setFileList(modlist);
  }

  useEffect(() => {
    if (mod === null) return;

    const entries: FileEntry[] = [];
    for (const f of mod.files) {
      entries.push({fileName: f, isInstalled: false});
    }
    setFileList(entries);
  }, [mod]);

  return mod !== null ? (
    <div>
      <div className={toolbarStyles.acgcag_downloaded_toolbar}>
        <div>
          <UIButton
            display
            invertColors
            onClick={returnToMods}
          >
            &lt;- Go back
          </UIButton>
        </div>
      </div>
      <div className={styles.acgcag_mod_display_frame}>
        <h1>{mod.name}</h1>
        <div className={styles.acgcag_display_info}>
          <img
            src={`modern-acgcag-files://${encodeURIComponent(mod.previewImgLocal)}`}
            alt={`${mod.name} preview`}
            draggable={false}
          />
          <div className={styles.acgcag_display_info_text}>
            <h3>Mod Info</h3>
            <p>
              ID: <span>{mod.itemId}</span>
            </p>
            <p>
              For: <span>{mod.character !== null ? mod.character : mod.super_category}</span>
            </p>
            <p>
              NSFW: <span>{capitalize(mod.nsfw.toString())}</span>
            </p>
          </div>
        </div>
        <div className={styles.acgcag_display_info_files}>
          <h3>Mod Items</h3>
          <table>
            <thead>
              <th>Name</th>
              <th>Enabled</th>
              <th>Remove</th>
            </thead>
            <tbody>
              {fileList.map(f => {
                return (
                  <FileTableEntry
                    file={f}
                    key={f.fileName}
                    onDelete={() => deleteEntry(f)}
                  />
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : (
    <></>
  );
}
