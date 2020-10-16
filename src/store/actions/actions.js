import * as actionTypes from './actionTypes';

export const setLanguage = (value) => {
  return {
    type: actionTypes.SET_LANGUAGE,
    langCode: value,
  }
}

export const setLanguageDisabled = (value) => {
  return {
    type: actionTypes.SET_LANGUAGE_DISABLED,
    langDisabled: value,
  }
}


