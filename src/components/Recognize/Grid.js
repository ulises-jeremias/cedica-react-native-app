import React, { Component } from 'react'
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
          <Row>
            <Button
              rounded
              onPress={() => navigate('Home')}
            >
              <Icon name='md-home' />
            </Button>
          </Row>
          <Row>
            <Col size={50}>
              <Image
                source={require('../../../assets/images/Caballos/angola-spc-zainocolorado.png')}
                style={styles.horseImage}
              />
            </Col>
            <Col size={15}>
              <H1>
                Test
              </H1>
              <Button
                warning
                onPress={() => alert(current)}
              >
                <Icon name='md-settings' />
              </Button>
            </Col>
            <Col size={25}>
              <Text>
                esto es un grid
              </Text>
            </Col>
          </Row>
        </Grid>
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3bc32',
    flex: 1,
  },
  contentContainer: {
    paddingTop: 30,
  },
  horseImage: {
    width: 200,
    resizeMode: 'contain',
  },
})

export default GridMode