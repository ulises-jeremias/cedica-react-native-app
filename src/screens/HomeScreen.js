import React from 'react'
import {
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native'

import {
  Button,
  Container,
  Icon,
  Text,
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
      <Container style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
          <Grid style={styles.homeContainer}>
            <Row>
              <Col>
                <Button warning style={styles.helpButton} onPress={() => alert('aaaa')}>
                  <Icon name='md-help-circle' />
                </Button>
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
                source={require('../../assets/images/UI/logo-app.png')}
                style={styles.appLogo}
              />
            </Row>
            <Row style={styles.secondRow}>
              <Col>
                <Image
                  source={require('../../assets/images/UI/logo-unlp.png')}
                  style={styles.unlpLogo}
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
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  homeContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  helpButton: {
    marginLeft: 15,
  },
  settingsButton: {
    alignSelf: 'flex-end',
    marginRight: 15,
  },
  appLogo: {
    width: 350,
    resizeMode: 'contain',
    marginTop: 3,
  },
  unlpLogo: {
    width: 250,
    resizeMode: 'contain',
  },
  infoLogo: {
    width: 250,
    resizeMode: 'contain',
  },
  secondRow: {
    alignItems: 'center',
  },
})
