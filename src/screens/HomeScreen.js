import React from 'react'
import {
  Image,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native'

import {
  Button,
  Icon,
} from 'native-base'

import { Row, Grid, Col } from "react-native-easy-grid"

export default class HomeScreen extends React.Component {
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
      <View style={styles.container}>
        <ScrollView style={styles.contentContainer}>
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
                <Image
                  source={require('../../assets/images/UI/reconocimiento_regular.png')}
                  style={styles.recognizeButton}
                />
              </Col>
              <Col>
                <Image
                  source={require('../../assets/images/UI/logo-facultad-informatica.png')}
                  style={styles.infoLogo}
                />
              </Col>
            </Row>
          </Grid>
        </ScrollView>
      </View>
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
