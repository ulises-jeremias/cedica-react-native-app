import React, { Component, Fragment } from 'react'
import {
  Image,
  StyleSheet,
} from 'react-native'


import {
  Button,
  Content,
  H1,
  Icon,
  Text,
} from 'native-base'

import { Row, Grid, Col } from "react-native-easy-grid"

import { horses, getRace, getImage } from '../../config/Horses'

class GridMode extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    const {
      navigate,
    } = this.props

    return (
      <Content padder style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Grid style={styles.homeContainer}>
          {
            horses.map(elem => (
              <Fragment key={elem}>
                <Image
                  source={getImage(elem)}
                  style={styles.horseImage}
                />
                <Text style={styles.horseRace}>
                  {getRace(elem)}
                </Text>
                <Button
                  transparent
                  onPress={() => alert('sonido')}
                >
                  <Image
                    source={require('../../../assets/images/UI/audio_click.png')}
                    style={styles.playSound}
                  />
                </Button>
              </Fragment>
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
  },
  horseRace: {
    textAlignVertical: 'bottom',
  },
  playSound: {
    height: 50,
    width: 50,
  },
})

export default GridMode