import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SoundPlayer from 'react-native-sound-player'
import { StyleSheet } from 'react-native'
import { Content } from 'native-base'

import settingsActions from '../../actions/settings-actions'

import ImageImage from './interactions/ImageImage'
import WordImage from './interactions/WordImage'
import ImageWord from './interactions/ImageWord'

import Lose from '../../components/MiniGameStatus/Lose'
import Success from '../../components/MiniGameStatus/Success'
import Win from '../../components/MiniGameStatus/Win'

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
    header: null,
  }

  constructor(props) {
    super(props)

    this.state = {
      result: null,
      success: 0,
      levels: 5,
    }

    this.onFailed = this.onFailed.bind(this)
    this.onSuccess = this.onSuccess.bind(this)
    this.handleRefresh = this.handleRefresh.bind(this)
    this.handleWin = this.handleWin.bind(this)
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
      success,
    } = this.state

    try {
      if (!(levels - 1) && (success + 1) < 3) {
        SoundPlayer.playSoundFile('assets_sounds_resoplido', 'mp3')            
      } else {
        SoundPlayer.playSoundFile('assets_sounds_relincho', 'm4a')
      }
    } catch (error) {
      console.log(error.message)
    }

    this.setState(() => ({
      result: (levels - 1) ? 'success' : ((success + 1) >= 3 ? 'win' : 'lose'),
      levels: levels - 1,
      success: success + 1,
    }))
  }

  onFailed() {
    const {
      levels,
      success,
    } = this.state

    try {
      if (!(levels - 1) && success >= 3) {
        SoundPlayer.playSoundFile('assets_sounds_resoplido', 'mp3')            
      } else {
        SoundPlayer.playSoundFile('assets_sounds_relincho', 'm4a')
      }
    } catch (error) {
      console.log(error.message)
    }

    setTimeout(() => {
      this.setState(() => ({
        result: (levels - 1) ? null : (success >= 3 ? 'win' : 'lose'),
        levels: levels - 1
      }))
    }, 2000)
  }

  handleRefresh() {
    this.setState(() => ({
      result: null,
      success: 0,
      levels: 5,
    }))
  }

  handleWin() {
    const {
      actions: {
        onSettingsFormFieldChange,
        updateStoredConfiguration,
      },
      settings: {
        settings: {
          current: {
            actualGameLevel,
          },
          fields,
        },
      },
    } = this.props

    let nextFields = fields

    if (actualGameLevel < 3) {
      onSettingsFormFieldChange('settings', 'actualGameLevel', ++nextFields.actualGameLevel)

      if (nextFields.actualGameLevel === 3) {
        onSettingsFormFieldChange('settings', 'miniGameCode', 'miniGames#2')
        nextFields.miniGameCode = 'miniGames#2'
      }
    }
    
    if (actualGameLevel === 3) {
      if (nextFields.levelCode === 'levels#0') {
        onSettingsFormFieldChange('settings', 'levelCode', 'levels#1')
        nextFields.levelCode = 'levels#1'
      }

      onSettingsFormFieldChange('settings', 'actualGameLevel', 1)
      nextFields.actualGameLevel = 1

      onSettingsFormFieldChange('settings', 'gamesWon', ++nextFields.gamesWon)

      onSettingsFormFieldChange('settings', 'miniGameCode', 'miniGames#0')
      nextFields.miniGameCode = 'miniGames#0'
    }
    
    updateStoredConfiguration(nextFields)
    
    this.handleRefresh()
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
        isFetching,
        settings: {
          current,
        },
      },
    } = this.props

    if (isFetching) {
      return (
        <Content style={styles.container}>
          <Spinner color='white' />
        </Content>
      )
    }

    const miniGamesComponent = {
      null: null,

      'win': <Win handleWin={this.handleWin} handleBackClick={() => navigate('Home')} />,
      'lose': <Lose handleRefresh={this.handleRefresh} handleBackClick={() => navigate('Home')} />,
      'success': <Success nextHandler={() => this.setState(() => ({ result: null }))} />,

      'miniGames#0': (
        <ImageWord
          {...this.state}
          config={current}
          navigate={navigate}
          onFailed={this.onFailed}
          onSuccess={this.onSuccess}
        />
      ),
      'miniGames#1': (
        <WordImage
          {...this.state}
          config={current}
          navigate={navigate}
          onFailed={this.onFailed}
          onSuccess={this.onSuccess}
        />
      ),
      'miniGames#2': (
        <ImageImage
          {...this.state}
          config={current}
          navigate={navigate}
          onFailed={this.onFailed}
          onSuccess={this.onSuccess}
        />
      ),
    }

    return miniGamesComponent[result !== null ? result : current.miniGameCode]
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3bc32',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(GameModeScreen)