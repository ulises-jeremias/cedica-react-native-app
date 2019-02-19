import React, { Component } from 'react'
import _ from 'underscore'
import {
  Image,
  StyleSheet,
} from 'react-native'


import {
  Button,
  Body,
  Content,
  H1,
  Icon,
  ListItem,
  Left,
  Right,
  Text,
} from 'native-base'

import { horses, getBreed, getImage, getName, getFur } from '../../config/Horses'

class ListMode extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <Content style={styles.container}>
        {
          horses.map(elem => (
            <ListItem key={getName(elem)} thumbnail>
              <Left>
                <Image
                  source={getImage(elem)}
                  resizeMode='contain'
                  style={styles.horseImage}
                />
              </Left>
              <Body style={styles.horseActions}>
                <H1>
                  {getName(elem)}
                </H1>
                <Button
                  transparent
                  onPress={() => alert('sonido')}
                >
                  <Image
                    source={require('../../../assets/images/UI/audio_click.png')}
                    style={styles.playSound}
                  />
                </Button>
              </Body>
              <Right>
                <Text style={styles.horseDescription}>
                  Raza: { getBreed(elem) }{'\n'}
                  Pelaje: { getFur(elem) }
                </Text>
              </Right>
            </ListItem>
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
  horseImage: {
    height: 150,
    width: 160,
  },
  playSound: {
    height: 50,
    width: 50,
  },
  horseDescription: {
    textAlign: 'left',
  }
})

export default ListMode