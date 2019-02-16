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
} from '../constants'

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