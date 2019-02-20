import React, { Component, Fragment } from 'react'
import _ from 'underscore'
import {
  Image,
  StyleSheet,
  View,
} from 'react-native'


import {
  Content,
  Text,
} from 'native-base'

import { Row, Grid, Col } from "react-native-easy-grid"

import { horses, getBreed, getImage, getName } from '../../config/Horses'

function horseRow(horseChunck) {
  return horseChunck.map(elem => (
    <Col key={getName(elem)}>
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
    </Col>
  ))
}

class GridMode extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    const horsesChunked = _.chunk(horses, 3)

    return (
      <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Grid>
          {
            horsesChunked.map((elem, index) => (
              <Row key={index}>
                {horseRow(elem)}
              </Row>
            ))
          }
        </Grid>
      </Content>
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
    alignSelf: 'center',
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