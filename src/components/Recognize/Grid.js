import React, { Component, Fragment } from 'react'
import {
  Image,
  StyleSheet,
  View,
} from 'react-native'


import {
  Container,
  Text,
} from 'native-base'

import { Row, Grid, Col } from "react-native-easy-grid"

import { horses, getBreed, getImage, getName } from '../../config/Horses'

class GridMode extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <Container style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Grid style={styles.homeContainer}>
          {
            horses.map(elem => (
              <Fragment key={getName(elem)}>
                <View style={styles.horseView}>
                  <Image
                    source={getImage(elem)}
                    style={styles.horseImage}
                  />
                  <Text style={styles.horseBreed}>
                    {getBreed(elem)}
                  </Text>
                  <Image
                    source={require('../../../assets/images/UI/audio_click.png')}
                    style={styles.playSound}
                  />
                </View>
              </Fragment>
            ))
          }
        </Grid>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3bc32',
  },
  contentContainer: {
    paddingTop: 30,
  },
  horseImage: {
    height: 150,
    width: 160,
  },
  horseBreed: {
    textAlignVertical: 'bottom',
    textAlign: 'center',
  },
  playSound: {
    height: 50,
    width: 50,
    alignSelf: 'center',
  },
})

export default GridMode