import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Image,
  View,
  ScrollView,
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

  render() {
    const {
      navigation: {
        navigate,
      },
    } = this.props

    return (
      <Content padder style={styles.container} contentContainerStyle={styles.contentContainer}>
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
            <Image
              source={require('../../assets/images/UI/jugar_regular.png')}
              style={styles.playButton}
            />
          </Row>
          <Row>
            <Col>
              <Image
                source={require('../../assets/images/UI/logo-unlp.png')}
                style={styles.unlpLogo}
              />
            </Col>
            <Col>
              <Button transparent onPress={() => navigate('RecognizeMode')}>
                <Image
                  source={require('../../assets/images/UI/reconocimiento_regular.png')}
                  style={styles.recognizeButton}
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
  container: {
    backgroundColor: '#fff',
    flex: 1,
  },
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
    paddingTop: 3,
    resizeMode: 'contain',
    width: 350,
  },
  cedicaLogo: {
    paddingTop: 10,
    resizeMode: 'contain',
    width: 150,
  },
  playButton: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 150,
  },
  recognizeButton: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: 250,
  },
  unlpLogo: {
    resizeMode: 'contain',
    width: 150,
  },
  infoLogo: {
    alignSelf: 'flex-end',
    resizeMode: 'contain',
    width: 150,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)