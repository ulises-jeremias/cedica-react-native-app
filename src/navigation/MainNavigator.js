import React from 'react'
import { createStackNavigator } from 'react-navigation'

import Home from '../screens/HomeScreen'
import Settings from '../screens/SettingsScreen'
import Help from '../screens/HelpScreen'
import RecognizeMode from '../screens/RecognizeMode'

export default createStackNavigator({
  Home,
  Settings,
  Help,
  RecognizeMode,
})

