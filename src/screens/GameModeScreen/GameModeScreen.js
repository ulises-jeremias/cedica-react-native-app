import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import ImageImage from './interactions/ImageImage'

import settingsActions from '../../actions/settings-actions'

function mapStateToProps(state) {
  const {
    settings
  } = state

  return {
    settings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...settingsActions,
    }, dispatch),
  }
}

class GameModeScreen extends Component {
  static navigationOptions = {
    title: 'Juego',
  }

  state = {
    isLoadingComplete: false,
  }

  componentDidMount() {
    const {
      actions: {
        getStoredConfiguration,
      }
    } = this.props

    getStoredConfiguration()
  }

  render() {
    const {
      navigation: {
        navigate,
      },
      settings: {
        settings: {
          current,
        },
      },
    } = this.props

    const miniGamesComponent = {
      null: null,
      'miniGames#0': null,
      'miniGames#1': null,
      'miniGames#2': (
        <ImageImage navigate={navigate} />
      ),
    }

    return miniGamesComponent[current.miniGameCode]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameModeScreen)