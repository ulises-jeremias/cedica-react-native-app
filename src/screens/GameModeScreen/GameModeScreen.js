import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
// import { Audio } from 'expo'
import { StyleSheet } from 'react-native'
import { Header, Button, Content, Icon, Container, Right } from 'native-base'
import { Grid, Col, Row } from 'react-native-easy-grid'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

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
        // const soundObject = new Audio.Sound()
          const soundObject = {
            loadAsync: () => {},
            playAsync: () => {}
          }
        
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
        // const soundObject = new Audio.Sound()
          const soundObject = {
            loadAsync: () => {},
            playAsync: () => {}
          }
        
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

      'win': (
        <Content style={{ backgroundColor: 'black' }}>
          <Grid>
            <Col>
              <Cup
                style={{
                  marginTop: hp('6%'),
                  width: wp('60%'),
                  height: hp('60%'),
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }} 
              />
            </Col>
            <Col>
              <Row>
                <Col style={{ paddingVertical: hp('17%') }}>
                  <Button style={{ alignSelf: 'center' }} warning onPress={() => navigate('Home')}>
                    <Icon name='md-home' />
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col style={{ paddingVertical: hp('7%') }}>
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
        <Container style={{ backgroundColor: 'black' }}>
          <Header transparent>
            <Right>
              <Button block warning onPress={() => this.setState(() => ({ result: null }))}>
                <Icon name='md-arrow-round-forward' />
              </Button>
            </Right>
          </Header>
          <Confetti
            style={{
              height: hp('100%'),
              width: wp('100%'),
              resizeMode: 'cover',
              alignSelf: 'center',
            }} 
          />
        </Container>
      ),
      'lose': (
        <Content style={{ backgroundColor: 'black' }}>
          <Grid>
            <Row>
              <Col style={{ paddingVertical: hp('18%') }}>
                <Button style={{ alignSelf: 'center' }} large warning onPress={() => navigate('Home')}>
                  <Icon name='md-home' />
                </Button>
              </Col>
              <Col style={{ paddingVertical: hp('18%') }}>
                <Button style={{ alignSelf: 'center' }} large warning onPress={this.handleRefresh}>
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