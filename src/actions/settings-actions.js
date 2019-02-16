import { AsyncStorage } from 'react-native'

import {
  actionRequest,
  actionSuccess,
  actionFailure,
} from '../helpers/action-dispatcher'

import {
  SETTINGS_STORED_CONFIGURATION_GET_REQUEST,
  SETTINGS_STORED_CONFIGURATION_GET_SUCCESS,
  SETTINGS_STORED_CONFIGURATION_GET_FAILURE,

  ON_SETTINGS_FORM_CLEAR,
  ON_SETTINGS_FORM_FIELD_CHANGE,
} from '../constants'

exports.onLicensesFormClear = (context, options) => {
  options = options || { error: true, success: true }

  return {
    type: ON_SETTINGS_FORM_CLEAR,
    payload: {
      context,
      options,
    },
  }
}

exports.onLicensesFormFieldChange = (context, field, value, currentUpdate = false) => {
  return {
    type: ON_SETTINGS_FORM_FIELD_CHANGE,
    payload: { context, field, value, currentUpdate },
  }
}

exports.getStoredConfiguration = () => {
  return dispatch => {
    dispatch(actionRequest(SETTINGS_STORED_CONFIGURATION_GET_REQUEST))
    return AsyncStorage.getItem('settings')
      .then(data => {
        dispatch(actionSuccess(SETTINGS_STORED_CONFIGURATION_GET_SUCCESS, 'settings', data))
      })
      .catch(err => {
        dispatch(actionFailure(SETTINGS_STORED_CONFIGURATION_GET_FAILURE, errorHandler(err)))
      })
  }
}