import React, { Component, Fragment } from 'react'
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
  Separator,
  H2,
} from 'native-base'

import { crosses, getImage, getName, getDescription } from '../../config/Horses'

class CrossesMode extends Component {
  static navigationOptions = {
    header: null,
  }

  render() {
    return (
      <Content style={styles.container}>
        {
          crosses.map(({ horse, father, mother }) => (
            <Fragment key={getName(horse)}>
              <Separator bordered style={styles.horseHeader}>
                <H2 style={styles.horseHeaderText}>
                  {getName(horse)}
                </H2>
              </Separator>
              <ListItem style={styles.horses}>
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
              <ListItem>
                <Text style={styles.horseDescription}>
                  {getDescription(horse)}
                </Text>
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
    height: 150,
    width: 160,
  },
  horses: {
    marginBottom: 30,
  },
  horseName: {
    textAlign: 'center',
  },
  horseDescription: {
    textAlign: 'justify',
    fontSize: 12,
    color: 'white',
  },
})

export default CrossesMode