import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
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
              style={styles.playButton}
              >
              <Image
                source={require('../../assets/images/UI/jugar_regular.png')}
                style={styles.playButtonImage}
              />
            </Button>
          </Row>
          <Row style={styles.lastRow}>
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
    paddingTop: hp('5%'),
  },
  homeContainer: {
    alignItems: 'center',
  },
  helpButton: {
    marginLeft: wp('2%'),
  },
  settingsButton: {
    alignSelf: 'flex-end',
    marginRight: wp('2%'),
  },
  appLogo: {
    alignSelf: 'center',
    resizeMode: 'contain',
    width: wp('45%'),
    height: hp('25%'),
  },
  cedicaLogo: {
    resizeMode: 'contain',
    width: wp('30%'),
    height: hp('35%'),
  },
  playButton: {
    alignSelf: 'center',
    marginTop: hp('5%'),
  },
  playButtonImage: {
    resizeMode: 'contain',
    width: wp('20%'),
    height: hp('22%'),
  },
  recognizeButton: {
    alignSelf: 'center',
    marginTop: hp('3%'),
  },
  recognizeButtonImage: {
    resizeMode: 'contain',
    width: wp('30%'),
    height: hp('17%'),
  },
  unlpLogo: {
    resizeMode: 'contain',
    width: wp('20%'),
    height: hp('15%'),
  },
  infoLogo: {
    alignSelf: 'flex-end',
    resizeMode: 'contain',
    width: wp('20%'),
    height: hp('15%'),
  },
  lastRow: {
    marginTop: hp('2%'),
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)