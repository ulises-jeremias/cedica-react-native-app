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

import defaultState from '../state/settings-state'

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
        if (_.isEmpty(data)) {
          data = defaultState.settings.current
        }

        dispatch(actionSuccess(SETTINGS_STORED_CONFIGURATION_GET_SUCCESS, 'settings', data))
      })
      .catch(err => {
        dispatch(actionFailure(SETTINGS_STORED_CONFIGURATION_GET_FAILURE, errorHandler(err)))
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
        dispatch(actionFailure(SETTINGS_STORED_CONFIGURATION_UPDATE_FAILURE, errorHandler(err)))
      })
  }
}