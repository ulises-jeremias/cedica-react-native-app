import React, { Component, Fragment } from 'react'
import _ from 'underscore'
import SoundPlayer from 'react-native-sound-player'
import {
  StyleSheet,
} from 'react-native'
import {
  Button,
  Body,
  Content,
  ListItem,
  Left,
  H2,
  Right,
  Text,
  Separator,
} from 'native-base'

import AsyncImage from '../AsyncImage'
import { horses, getImage, getName, getDescription, getSound } from '../../config/Horses'

class ListMode extends Component {
  static navigationOptions = {
    header: null,
  }

  onPlayPress(elem) {
    const {
      sound
    } = this.props

    return () => {
      try {
        const [path, ext] = getSound(elem, sound)

        if (!path) {
          return
        }

        SoundPlayer.playSoundFile(path, ext)
      } catch (error) {
        console.log(error.message)
      }
    }
  }

  render() {
    return (
      <Content style={styles.container}>
        {
          horses.map(elem => (
            <Fragment key={getName(elem)}>
              <Separator bordered style={styles.horseHeader}>
                <H2 style={styles.horseHeaderText}>
                  {getName(elem)}
                </H2>
              </Separator>
              <ListItem style={styles.horses}>
                <Left>
                  <AsyncImage
                    source={getImage(elem)}
                    resizeMode='contain'
                    style={styles.horseImage}
                  />
                </Left>
                <Body>
                  <Text style={styles.horseDescription}>
                    { getDescription(elem) }
                  </Text>
                </Body>
                <Right style={styles.horseActions}>
                  <Button
                    transparent
                    onPress={this.onPlayPress(elem)}
                  >
                    <AsyncImage
                      source={require('../../../assets/images/UI/audio_click.png')}
                      style={styles.playSound}
                    />
                  </Button>
                </Right>
              </ListItem>
            </Fragment>
          ))
        }
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3bc32',
  },
  horseHeader: {
    backgroundColor: '#9d7309'
  },
  horseHeaderText: {
    color: 'white'
  },
  horseImage: {
    height: 250,
    width: 260,
  },
  horses: {
    marginBottom: 30,
  },
  playSound: {
    height: 50,
    width: 50,
  },
  horseDescription: {
    textAlign: 'justify',
    fontSize: 12,
    color: 'white'
  }
})

export default ListMode