// @flow

import { LANGUAGE_LOADED, LOAD_LANGUAGE, CHANGE_LANGUAGE } from '../constants/actionTypes';
import type { ActionCreator } from '../types/action';
import type { FsObject } from '../types/fsObject';
import { readLangFile } from '../fs/fs';

export const change = (langKey: string, callback?: Function): ActionCreator => {
  return (dispatch, getState) => {
    const langReady = (): void => {
      window.reportr.curLang = langKey;

      dispatch({
        type: CHANGE_LANGUAGE,
        payload: { lang: langKey },
      });

      if (callback) {
        callback();
      }
    };

    if (window.reportr.translations[langKey] === undefined) {
      dispatch(
        load(langKey, function(ioResult: FsObject) {
          Object.assign(window.reportr.translations, ioResult.data);
          langReady();
        })
      );
    } else {
      langReady();
    }
  };
};

export const load = (lang: string, callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_LANGUAGE,
      meta: { lang: lang },
    });
    readLangFile(lang, callback);
  };
};

export const loaded = (): ActionCreator => {
  return { type: LANGUAGE_LOADED };
};
