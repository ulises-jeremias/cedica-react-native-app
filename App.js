import React from 'react'
import { Platform, StatusBar, StyleSheet, View } from 'react-native'
import { Provider } from 'react-redux'
import { AppLoading, Asset, Font, Icon } from 'expo'

import AppNavigator from './src/navigation/AppNavigator'

import store from './src/store'

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      )
    } else {
      return (
        <Provider store={store}>
          <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
            <AppNavigator />
          </View>
        </Provider>
      )
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/sounds/Relincho.mp3'),
        require('./assets/sounds/Resoplido.m4a'),

        require('./assets/images/Festejos/confetti.gif'),
        require('./assets/images/Festejos/cup.gif'),

        require('./assets/images/Caballos/amapola-petiso_argentino-rosillo.png'),
        require('./assets/images/Caballos/ambar-mestizo_cruza_arabe-alazan_tostado.png'),
        require('./assets/images/Caballos/angola-sangre_pura_de_carrera-zainocolorado.png'),
        require('./assets/images/Caballos/antu-Mestizo-overo_zaino.png'),
        require('./assets/images/Caballos/bionda-mestizo-alazán_ruano.png'),
        require('./assets/images/Caballos/blanco-mestizo-blanco.png'),
        require('./assets/images/Caballos/bonita-mestizo_qh_con_criollo-overo_azulejo.png'),
        require('./assets/images/Caballos/cacique-mestizo-alazan.png'),
        require('./assets/images/Caballos/candelaria-mestizo-tobiano.png'),
        require('./assets/images/Caballos/ciro-mestizo-tordillo_canela.png'),
        require('./assets/images/Caballos/felipe-mestizo-zaino.png'),
        require('./assets/images/Caballos/hualfín-criollo-horsepicaso.png'),
        require('./assets/images/Caballos/juana-cuarto_de_milla-bayo.png'),
        require('./assets/images/Caballos/mora-petiso_argentino-tordillo_moro.png'),
        require('./assets/images/Caballos/muñeco-mestizo-overo_rosado.png'),
        require('./assets/images/Caballos/nala-mestizo-moro.png'),
        require('./assets/images/Caballos/pamperito-petiso_argentino-zaino.png'),
        require('./assets/images/Caballos/pintada-mestizo-alazan_pintado.png'),
        require('./assets/images/Caballos/pochito-mestizo-zaino.png'),
        require('./assets/images/Caballos/primavera-silla_argentino-alazan.png'),
        require('./assets/images/Caballos/tigre-criollo-bayo_gateado.png'),
        require('./assets/images/Caballos/tupac-mestizo-zaino_oscuro.png'),
        require('./assets/images/Caballos/zorzal-mestizo-tordillo.png'),
        require('./assets/images/Crosses/bella/bella.png'),
        require('./assets/images/Crosses/bella/bonita.png'),
        require('./assets/images/Crosses/bella/apapaloosa.png'),
        require('./assets/images/Crosses/huayra/huayra.png'),
        require('./assets/images/Crosses/huayra/pocha.png'),
        require('./assets/images/Crosses/huayra/apapaloosa.png'),
        require('./assets/images/Crosses/mancha/mancha.png'),
        require('./assets/images/Crosses/mancha/pintada.png'),
        require('./assets/images/Crosses/mancha/apapaloosa.png'),
        require('./assets/images/Crosses/nalito/nalito.png'),
        require('./assets/images/Crosses/nalito/nala.png'),
        require('./assets/images/Crosses/nalito/silla_argentino.png'),
        require('./assets/images/Crosses/orita/orita.png'),
        require('./assets/images/Crosses/orita/petra.png'),
        require('./assets/images/Crosses/orita/alazan_tostado.png'),
        require('./assets/images/Crosses/pirata/pirata.png'),
        require('./assets/images/Crosses/pirata/kika.png'),
        require('./assets/images/Crosses/pirata/tobiano.png'),
  
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
      }),
    ])
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error)
  }

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
