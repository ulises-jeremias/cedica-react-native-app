import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Image,
  StyleSheet,
} from 'react-native'

import {
  Button,
  Content,
  Icon,
} from 'native-base'

import { Row, Grid, Col } from "react-native-easy-grid"

import settingsActions from '../actions/settings-actions'

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

class HomeScreen extends Component {
  static navigationOptions = {
    header: null,
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
    } = this.props

    return (
      <Content style={styles.contentContainer}>
        <Grid style={styles.homeContainer}>
          <Row>
            <Col>
              <Button
                warning
                style={styles.helpButton}
                onPress={() => navigate('Help')}
              >
                <Icon name='md-help-circle' />
              </Button>
            </Col>
            <Col>
              <Image
                source={require('../../assets/images/UI/logo-app.png')}
                style={styles.appLogo}
            />
            </Col>
            <Col>
              <Button
                warning
                style={styles.settingsButton}
                onPress={() => navigate('Settings')}
              >
                <Icon name='md-settings' />
              </Button>
            </Col>
          </Row>
          <Row>
            <Image
              source={require('../../assets/images/UI/cedica.png')}
              style={styles.cedicaLogo}
            />
          </Row>
          <Row>
            <Button
              onPress={() => navigate('GameMode')}
              transparent
              >
              <Image
                source={require('../../assets/images/UI/jugar_regular.png')}
                style={styles.playButtonImage}
              />
            </Button>
          </Row>
          <Row>
            <Col>
              <Image
                source={require('../../assets/images/UI/logo-unlp.png')}
                style={styles.unlpLogo}
              />
            </Col>
            <Col>
              <Button
                style={styles.recognizeButton}
                onPress={() => navigate('RecognizeMode')}
                transparent
                >
                <Image
                  source={require('../../assets/images/UI/reconocimiento_regular.png')}
                  style={styles.recognizeButtonImage}
                />
              </Button>
            </Col>
            <Col>
              <Image
                source={require('../../assets/images/UI/logo-facultad-informatica.png')}
                style={styles.infoLogo}
              />
            </Col>
          </Row>
        </Grid>
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 30,
  },
  homeContainer: {
    alignItems: 'center',
  },
  helpButton: {
    marginLeft: 15,
  },
  settingsButton: {
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  appLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 350,
    height: 100,
  },
  cedicaLogo: {
    resizeMode: 'contain',
    width: 150,
    height: 150,
  },
  playButtonImage: {
    resizeMode: 'contain',
    marginTop: 40,
    width: 200,
    height: 100,
  },
  recognizeButton: {
    alignSelf: 'center',
    marginTop: 50,
  },
  recognizeButtonImage: {
    resizeMode: 'contain',
    width: 250,
    height: 100,
  },
  unlpLogo: {
    resizeMode: 'contain',
    width: 150,
    height: 150,
  },
  infoLogo: {
    alignSelf: 'flex-end',
    resizeMode: 'contain',
    width: 150,
    height: 150,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)