import React, { Component, Fragment } from 'react'
import { Audio } from 'expo'
import _ from 'underscore'
import {
  Image,
  StyleSheet,
  View,
} from 'react-native'


import {
  Button,
  Content,
  Text,
} from 'native-base'

import { Row, Grid, Col } from "react-native-easy-grid"

import { horses, getBreed, getImage, getName } from '../../config/Horses'

class GridMode extends Component {
  static navigationOptions = {
    header: null,
  }

  horseRow(horseChunck) {
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
          <Button
            transparent
            onPress={this.onPlayPress(elem)}
          >
            <Image
              source={require('../../../assets/images/UI/audio_click.png')}
              style={styles.playSound}
            />
          </Button>
        </View>
      </Col>
    ))
  }

  onPlayPress(elem) {
    return () => {
      try {
        (async () => {
          const soundObject = new Audio.Sound()
          
          await soundObject.loadAsync(elem.sound.female)
          await soundObject.playAsync()
        })()
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  render() {
    const horsesChunked = _.chunk(horses, 3)

    return (
      <Content style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Grid>
          {
            horsesChunked.map((elem, index) => (
              <Row key={index}>
                {this.horseRow(elem)}
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