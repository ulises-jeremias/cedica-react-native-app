import { combineActions, handleActions } from 'redux-actions'

import {
  SETTINGS_STORED_CONFIGURATION_GET_REQUEST,
  SETTINGS_STORED_CONFIGURATION_GET_SUCCESS,
  SETTINGS_STORED_CONFIGURATION_GET_FAILURE,

  SETTINGS_STORED_CONFIGURATION_UPDATE_REQUEST,
  SETTINGS_STORED_CONFIGURATION_UPDATE_SUCCESS,
  SETTINGS_STORED_CONFIGURATION_UPDATE_FAILURE,
  
  ON_SETTINGS_FORM_CLEAR,
  ON_SETTINGS_FORM_FIELD_CHANGE,
} from '../constants'

import initialState from '../state/settings-state'
import formValidation from './settings-form'

import {
  formRequestHandler,
  formSuccessHandler,
  formFailureHandler,
} from '../helpers/action-handler'

const reducer = handleActions({


  [combineActions(
    SETTINGS_STORED_CONFIGURATION_GET_REQUEST,
    SETTINGS_STORED_CONFIGURATION_UPDATE_REQUEST,
  )]: formRequestHandler('settings'),

  [combineActions(
    SETTINGS_STORED_CONFIGURATION_GET_SUCCESS,
    SETTINGS_STORED_CONFIGURATION_UPDATE_SUCCESS,
  )]: formSuccessHandler('settings'),

  [combineActions(
    SETTINGS_STORED_CONFIGURATION_GET_FAILURE,
    SETTINGS_STORED_CONFIGURATION_UPDATE_FAILURE,
  )]: formFailureHandler('settings'),

  [ON_SETTINGS_FORM_CLEAR]: (state, { payload: { context, options } }) => {
    let nextSettingsState = {
      ...state,
      [context]: {
        ...initialState[context],
        isValid: false
      },
    }

    Object.keys(options || {})
      .filter(option => options[option])
      .forEach(option => {
        nextSettingsState[context][option] = initialState[context][option]
      })

    return nextSettingsState
  },

  [ON_SETTINGS_FORM_FIELD_CHANGE]: (state, action) => {
    const {
      context,
      field,
      value,
      currentUpdate,
    } = action.payload

    const contextData = state[context]

    let nextSettingsState = {
      ...state,
      [context]: {
        ...contextData,
        error: null,
        success: null,
        current: !currentUpdate ? contextData.current : {
          ...contextData.current,
          [field]: value,
        },
        fields: {
          ...contextData.fields,
          [field]: value,
        },
      }
    }

    return formValidation(context, nextSettingsState, action)
  },
}, initialState)
  
export default reducer