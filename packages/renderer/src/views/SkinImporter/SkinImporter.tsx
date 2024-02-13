import React, {useEffect, useState} from 'react';

import GameBananaAPI from '@/services/gamebananaApi';
import {GameNotSupportedError, ModRequestError} from '@/services/gamebananaApi';
import type {GBModPost} from '@/services/gamebananaApi';
import ModDisplayFrame from '@/components/ModDisplayFrame/ModDisplayFrame';

import styles from './SkinImporter.module.css';

export default function SkinImporter() {
  const [inputQuery, setInputQuery] = useState('');
  const [queryNotValid, setQueryNotValid] = useState(false);
  const [currentMod, setCurrentMod] = useState<GBModPost | null>(null);

  function openFileChooser() {
    const fileInput = document.getElementById('file-importer') as HTMLInputElement;
    if (!fileInput) return;

    fileInput.click();
  }

  function importLocalMod(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);
  }

  async function searchMod(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const query = ((event.target as HTMLFormElement)[0] as HTMLInputElement).value;
    try {
      const modInfo = await GameBananaAPI.modFromUrlOrId(query);
      setCurrentMod(modInfo);
    } catch (error) {
      setCurrentMod(null);
      if (error instanceof GameNotSupportedError) {
        console.log('Game Not Supported');
      }

      if (error instanceof ModRequestError) {
        console.log(error.message);
      }
    }
  }

  useEffect(() => {
    try {
      if (inputQuery !== '') {
        GameBananaAPI.inputIsValid(inputQuery);
        setQueryNotValid(false);
      } else setQueryNotValid(false);
    } catch {
      setQueryNotValid(true);
    }
  }, [inputQuery]);

  return (
    <div className={styles.acgcag_skin_importer}>
      <div className={styles.importer_searcher}>
        <form onSubmit={searchMod}>
          <div className={styles.importer_input}>
            <p>Import skin from URL</p>
            <input
              type="text"
              placeholder="URL or mod code (e.g: 422561)"
              onChange={e => setInputQuery(e.target.value.trim())}
              value={inputQuery}
              name="mod-search-str"
            />
            <button
              type="submit"
              disabled={queryNotValid}
            >
              Search
            </button>
          </div>
          <span style={{display: queryNotValid ? 'block' : 'none'}}>* Invalid mod URL or Code</span>
        </form>
        <form onSubmit={() => ''}>
          <div className={styles.importer_input}>
            <p>Import skin from ( .zip / .rar / .7z ) file</p>
            <input
              type="file"
              style={{display: 'none'}}
              id="file-importer"
              onChange={e => importLocalMod(e)}
            />
            <button
              type="button"
              onClick={openFileChooser}
              disabled
            >
              Open Archive
            </button>
          </div>
        </form>
      </div>
      <ModDisplayFrame mod={currentMod} />
    </div>
  );
}
