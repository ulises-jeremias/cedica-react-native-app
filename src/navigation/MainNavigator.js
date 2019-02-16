import React from 'react'
import { createStackNavigator } from 'react-navigation'

import HomeScreen from '../screens/HomeScreen'
import SettingsScreen from '../screens/SettingsScreen'
import HelpScreen from '../screens/HelpScreen'

export default createStackNavigator({
  Home: HomeScreen,
  Settings: SettingsScreen,
  Help: HelpScreen,
})

