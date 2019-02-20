import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Audio } from 'expo'
import { StyleSheet } from 'react-native'
import { Button, Content, Icon } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'

import settingsActions from '../../actions/settings-actions'

import ImageImage from './interactions/ImageImage'
import WordImage from './interactions/WordImage'
import ImageWord from './interactions/ImageWord'

import Cup from '../../components/Success/Cup'
import Confetti from '../../components/Success/Confetti'

import successSound from '../../../assets/sounds/Relincho.mp3'
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
      (async () => {
        const soundObject = new Audio.Sound()
        
        if (!(levels - 1) && (success + 1) < 3) {
          await soundObject.loadAsync(failedSound)            
        } else {
          await soundObject.loadAsync(successSound)
        }

        await soundObject.stopAsync()
        await soundObject.playAsync()
      })()
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
      (async () => {
        const soundObject = new Audio.Sound()
        
        if (!(levels - 1) && success >= 3) {
          await soundObject.loadAsync(successSound)
        } else {
          await soundObject.loadAsync(failedSound)            
        }

        await soundObject.stopAsync()
        await soundObject.playAsync()
      })()
    } catch (error) {
      console.log(error.message)
    }

    this.setState(() => ({
      result: (levels - 1) ? null : (success >= 3 ? 'win' : 'lose'),
      levels: levels - 1
    }))
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
            miniGameCode,
          },
          fields,
        },
      },
    } = this.props

    const p = String(miniGameCode).split('#')

    const value = `${p[0]}#${p[1] === '2' ? 0 : parseInt(p[1]) + 1}`

    onSettingsFormFieldChange('settings', 'miniGameCode', value)
    updateStoredConfiguration({
      ...fields,
      miniGameCode: value,
    })

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

      'win': (
        <Content style={{ backgroundColor: 'black' }}>
          <Grid>
            <Col>
              <Cup
                style={{
                  width: 450,
                  height: 300,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }} 
              />
            </Col>
            <Col>
              <Row>
                <Col style={{ paddingVertical: 50 }}>
                  <Button style={{ alignSelf: 'center' }} warning onPress={() => navigate('Home')}>
                    <Icon name='md-home' />
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col style={{ paddingVertical: 50 }}>
                  <Button style={{ alignSelf: 'center' }} warning onPress={this.handleWin}>
                    <Icon name='md-arrow-round-forward' />
                  </Button>
                </Col>
              </Row>
            </Col>
          </Grid>
        </Content>
      ),
      'success': (
        <Content style={{ backgroundColor: 'black' }}>
          <Grid>
            <Col>
              <Confetti
                style={{
                  resizeMode: 'cover',
                  alignSelf: 'center',
                }} 
              />
            </Col>
            <Col style={{ paddingVertical: 50 }}>
              <Button style={{ alignSelf: 'center' }} warning onPress={() => this.setState(() => ({ result: null }))}>
                <Icon name='md-arrow-round-forward' />
              </Button>
            </Col>
          </Grid>
        </Content>
      ),
      'lose': (
        <Content style={{ backgroundColor: 'black' }}>
          <Grid>
            <Row>
              <Col style={{ paddingVertical: 50 }}>
                <Button style={{ alignSelf: 'center' }} warning onPress={() => navigate('Home')}>
                  <Icon name='md-home' />
                </Button>
              </Col>
              <Col style={{ paddingVertical: 50 }}>
                <Button style={{ alignSelf: 'center' }} warning onPress={this.handleRefresh}>
                  <Icon name='md-repeat' />
                </Button>
              </Col>
            </Row>
          </Grid>
        </Content>
      ),

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