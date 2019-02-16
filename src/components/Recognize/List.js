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

import { horses, getRace, getImage } from '../../config/Horses'

class ListMode extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <Content style={styles.container}>
        {
          horses.map(elem => (
            <ListItem key={elem} thumbnail>
              <Left>
                <Image
                  source={getImage(elem)}
                  resizeMode='contain'
                  style={styles.horseImage}
                />
              </Left>
              <Body style={styles.horseActions}>
                <H1>
                  {getRace(elem)}
                </H1>
                <Button
                  warning
                  onPress={() => alert('sonido')}
                >
                  <Icon name='md-settings' />
                </Button>
              </Body>
              <Right>
                <Text>
                  { elem }
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
})

export default ListMode