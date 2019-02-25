import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
// import { AppLoading, Asset, Font, Icon } from 'expo'

import AppNavigator from './src/navigation/AppNavigator'

import store from './src/store'

console.disableYellowBox = true

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
          {Platform.OS === 'android' && <StatusBar hidden />}
          <AppNavigator />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
