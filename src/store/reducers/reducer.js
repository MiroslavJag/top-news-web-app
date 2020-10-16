import * as actionTypes from '../actions/actionTypes'
import {LANG_CODES} from 'consts.json'


export const initialState = {
  langCode: LANG_CODES.GB,
  langDisabled: false
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_LANGUAGE:
      return {
        ...state,
        langCode: action.langCode
      }
    case actionTypes.SET_LANGUAGE_DISABLED:
      return {
        ...state,
        langDisabled: action.langDisabled
      }
    default:
      return state
  }
}

export default reducer
