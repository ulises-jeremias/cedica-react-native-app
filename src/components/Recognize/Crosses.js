import React, { Component } from 'react'
import _ from 'underscore'
import {
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native'

import {
  Body,
  Content,
  ListItem,
  Left,
  Right,
} from 'native-base'

import { crosses, getImage, getName } from '../../config/Horses'

class ListMode extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <Content style={styles.container}>
        {
          crosses.map(({ horse, father, mother }) => (
            <ListItem key={getName(horse)} style={styles.horses}>
              <Left>
                <View>
                  <Image
                    source={getImage(horse)}
                    resizeMode='contain'
                    style={styles.horseImage}
                  />
                  <Text
                    style={styles.horseName}
                  >
                    {getName(horse)}
                  </Text>
                </View>
              </Left>
              <Body style={styles.horseActions}>
                <View>
                  <Image
                    source={getImage(father)}
                    resizeMode='contain'
                    style={styles.horseImage}
                  />
                  <Text>
                    {getName(father)}(Padre)
                  </Text>
                </View>
              </Body>
              <Right>
                <View>
                  <Image
                    source={getImage(mother)}
                    resizeMode='contain'
                    style={styles.horseImage}
                  />
                  <Text
                    style={styles.horseName}
                  >
                    {getName(mother)}(Madre)
                  </Text>
                </View>
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
  horses: {
    marginBottom: 30,
  },
  horseName: {
    textAlign: 'center',
  },
})

export default ListMode