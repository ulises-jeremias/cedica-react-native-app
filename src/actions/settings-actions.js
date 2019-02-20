import { AsyncStorage } from 'react-native'
import _ from 'underscore'

import {
  actionRequest,
  actionSuccess,
  actionFailure,
} from '../helpers/action-dispatcher'

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

import options from '../config/Options'

exports.onSettingsFormClear = (context, options) => {
  options = options || { error: true, success: true }

  return {
    type: ON_SETTINGS_FORM_CLEAR,
    payload: {
      context,
      options,
    },
  }
}

exports.onSettingsFormFieldChange = (context, field, value, currentUpdate = false) => {
  return {
    type: ON_SETTINGS_FORM_FIELD_CHANGE,
    payload: { context, field, value, currentUpdate },
  }
}

exports.getStoredConfiguration = () => {
  return dispatch => {
    dispatch(actionRequest(SETTINGS_STORED_CONFIGURATION_GET_REQUEST))
    return AsyncStorage.getItem('settings')
      .then(data => JSON.parse(data))
      .then(data => {
        if (data === null) {
          data = {
            viewModeCode: options.settings.viewModes[0].code,
            miniGameCode: options.settings.miniGames[0].code,

            levelCode: options.settings.levels[0].code,
            soundCode: options.settings.sounds[0].code,

            gameModeCodes: [
              options.settings.gameModes[0].code,
            ],
          }
        }

        dispatch(actionSuccess(SETTINGS_STORED_CONFIGURATION_GET_SUCCESS, 'settings', data))
      })
      .catch(err => {
        dispatch(actionFailure(SETTINGS_STORED_CONFIGURATION_GET_FAILURE, err.message))
      })
  }
}

exports.updateStoredConfiguration = (data) => {
  return dispatch => {
    dispatch(actionRequest(SETTINGS_STORED_CONFIGURATION_UPDATE_REQUEST))
    return AsyncStorage.setItem('settings', JSON.stringify(data))
      .then(() => {
        dispatch(actionSuccess(SETTINGS_STORED_CONFIGURATION_UPDATE_SUCCESS, 'settings', data))
      })
      .catch(err => {
        dispatch(actionFailure(SETTINGS_STORED_CONFIGURATION_UPDATE_FAILURE, err.message))
      })
  }
}