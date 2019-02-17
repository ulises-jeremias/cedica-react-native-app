import React from 'react'
import { createStackNavigator } from 'react-navigation'

import Home from '../screens/HomeScreen'
import Settings from '../screens/SettingsScreen'
import Help from '../screens/HelpScreen'
import RecognizeMode from '../screens/RecognizeModeScreen'
import GameMode from '../screens/GameModeScreen'

export default createStackNavigator({
  Home,
  Settings,
  Help,
  RecognizeMode,
  GameMode,
})

