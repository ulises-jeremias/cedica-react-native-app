import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import SoundPlayer from 'react-native-sound-player'
import { StyleSheet } from 'react-native'
import { Content } from 'native-base'
import _ from 'underscore'

import settingsActions from '../../actions/settings-actions'

import ImageImage from './interactions/ImageImage'
import WordImage from './interactions/WordImage'
import ImageWord from './interactions/ImageWord'

import Lose from '../../components/MiniGameStatus/Lose'
import Failed from '../../components/MiniGameStatus/Failed'
import Success from '../../components/MiniGameStatus/Success'
import Win from '../../components/MiniGameStatus/Win'

import { crosses, horses } from '../../config/Horses'

require('../../../assets/images/Festejos/cup.gif')

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
      selectedOption: null,
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

  onSuccess(option) {
    const {
      levels,
      success,
    } = this.state

    return () => {
      try {
        if (!(levels - 1) && (success + 1) < 3) {
          SoundPlayer.playSoundFile('assets_sounds_resoplido', 'mp3')            
        } else {
          SoundPlayer.playSoundFile('assets_sounds_relincho', 'm4a')
        }
      } catch (error) {
        console.log(error.message)
      }
  
      setTimeout(() => {
        this.setState(() => ({
          result: (levels - 1) ? 'success' : ((success + 1) >= 3 ? 'win' : 'lose'),
          levels: levels - 1,
          success: success + 1,
          selectedOption: option,
        }))
      }, 1000)
    }
  }

  onFailed(option) {
    const {
      levels,
      success,
    } = this.state

    return () => {
      try {
        if (!(levels - 1) && success >= 3) {
          SoundPlayer.playSoundFile('assets_sounds_relincho', 'm4a')
        } else {
          SoundPlayer.playSoundFile('assets_sounds_resoplido', 'mp3')            
        }
      } catch (error) {
        console.log(error.message)
      }
  
      setTimeout(() => {
        this.setState(() => ({
          result: (levels - 1) ? 'failed' : (success >= 3 ? 'win' : 'lose'),
          levels: levels - 1,
          selectedOption: option,
        }))
      }, 1000)
    }
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
            lastWonGameLevel,
          },
          fields,
        },
      },
    } = this.props

    let nextFields = fields

    if (actualGameLevel < 3) {
      if (lastWonGameLevel === actualGameLevel - 1) {
        onSettingsFormFieldChange('settings', 'lastWonGameLevel', ++nextFields.lastWonGameLevel)
      }

      onSettingsFormFieldChange('settings', 'actualGameLevel', ++nextFields.actualGameLevel)

      if (nextFields.actualGameLevel === 3) {
        onSettingsFormFieldChange('settings', 'miniGameInteractionCode', 'miniGameInteractions#2')
        nextFields.miniGameInteractionCode = 'miniGameInteractions#2'
      }
    }
    
    if (actualGameLevel === 3) {
      if (nextFields.levelCode === 'levels#0') {
        onSettingsFormFieldChange('settings', 'levelCode', 'levels#1')
        nextFields.levelCode = 'levels#1'
      }

      onSettingsFormFieldChange('settings', 'actualGameLevel', 1)
      nextFields.actualGameLevel = 1

      onSettingsFormFieldChange('settings', 'lastWonGameLevel', 0)
      nextFields.lastWonGameLevel = 0

      onSettingsFormFieldChange('settings', 'miniGameInteractionCode', 'miniGameInteractions#0')
      nextFields.miniGameInteractionCode = 'miniGameInteractions#0'
    }
    
    updateStoredConfiguration(nextFields)
    
    this.handleRefresh()
  }

  render() {
    const {
      result,
      selectedOption,
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

    const samples = current.levelCode === 'levels#0' ? 2 : 4

    const elements = current.miniGameInteractionCode === 'miniGameInteractions#2' ?
      _.sample(crosses, samples) : 
      _.sample(horses, samples)
    
    const horseIndex = Math.floor(Math.random() * (samples - 1))
    const option = current.actualGameLevel === 2 ? 2 : Math.floor(Math.random() * 2)

    const miniGameInteractionsComponent = {
      null: null,

      'win': (
        <Win
          handleWin={this.handleWin}
          handleBackClick={() => navigate('Home')}
        />
      ),
      'lose': (
        <Lose
          nextHandler={this.handleRefresh}
          handleBackClick={() => navigate('Home')}
        />
      ),
      'success': (
        <Success
          config={current}
          selectedOption={selectedOption}
          nextHandler={() => this.setState(() => ({ result: null }))}
        />
      ),
      'failed': (
        <Failed
          config={current}
          selectedOption={selectedOption}
          nextHandler={() => this.setState(() => ({ result: null }))}
        />
      ),

      'miniGameInteractions#0': (
        <ImageWord
          {...this.state}
          config={current}
          horses={elements}
          horseIndex={horseIndex}
          option={option}
          navigate={navigate}
          onFailed={this.onFailed}
          onSuccess={this.onSuccess}
        />
      ),
      'miniGameInteractions#1': (
        <WordImage
          {...this.state}
          config={current}
          horses={elements}
          horseIndex={horseIndex}
          option={option}
          navigate={navigate}
          onFailed={this.onFailed}
          onSuccess={this.onSuccess}
        />
      ),
      'miniGameInteractions#2': (
        <ImageImage
          {...this.state}
          config={current}
          horses={elements}
          horseIndex={horseIndex}
          navigate={navigate}
          onFailed={this.onFailed}
          onSuccess={this.onSuccess}
        />
      ),
    }

    return miniGameInteractionsComponent[result !== null ? result : current.miniGameInteractionCode]
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3bc32',
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(GameModeScreen)