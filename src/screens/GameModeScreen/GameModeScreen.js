import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Audio } from 'expo'

import settingsActions from '../../actions/settings-actions'

import ImageImage from './interactions/ImageImage'
import WordImage from './interactions/WordImage'
import Cup from '../../components/Success/Cup'

import successSound from '../../../assets/sounds/Relincho.m4a'
import failedSound from '../../../assets/sounds/Resoplido.m4a'

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

  constructor(props) {
    super(props)

    this.state = {
      result: null,
      attempts: 2,
      levels: 5,
    }

    this.onFailed = this.onFailed.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
  }

  componentDidMount() {
    const {
      actions: {
        getStoredConfiguration,
      }
    } = this.props

    getStoredConfiguration()
  }

  onSuccess() {
    const {
      levels,
    } = this.state

    try {
      (async () => {
        const soundObject = new Audio.Sound()
        
        await soundObject.loadAsync(successSound)
        await soundObject.playAsync()
      })()
    } catch (error) {
      console.log(error.message)
    }

    this.setState(() => ({
      result: (levels - 1) ? 'success' : 'win',
      levels: levels - 1,
    }))
  }

  onFailed() {
    const {
      attempts,
    } = this.state

    try {
      (async () => {
        const soundObject = new Audio.Sound()
        
        await soundObject.loadAsync(failedSound)
        await soundObject.playAsync()
      })()
    } catch (error) {
      console.log(error.message)
    }

    this.setState(() => ({
      result: (attempts - 1) ? 'failed' : 'lose',
      attempts: attempts - 1,
    }))
  }

  render() {
    const {
      result,
    } = this.state

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

      'win': (
        <Cup />
      ),
      'success': null,
      'failed': null,
      'lose': null,

      'miniGames#0': null,
      'miniGames#1': (
        <WordImage
          {...this.state}
          navigate={navigate}
          onFailed={this.onFailed}
          onSuccess={this.onSuccess}
        />
      ),
      'miniGames#2': (
        <ImageImage navigate={navigate} />
      ),
    }

    return miniGamesComponent[result !== null ? result : current.miniGameCode]
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameModeScreen)