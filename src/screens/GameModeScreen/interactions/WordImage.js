import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'
import {
  Col,
  Grid,
  Row,
} from 'react-native-easy-grid'
import {
  Image,
  StyleSheet,
  TouchableHighlight,
} from 'react-native'
import {
  Content,
  Text,
} from 'native-base'

import settingsActions from '../../../actions/settings-actions'
import { horses, getImage, getBreed } from '../../../config/Horses'

function mapStateToProps(state) {
  const {
    settings
  } = state

  return {
    settings
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      ...settingsActions,
    }, dispatch),
  }
}

class WordImageInteractionModeScreen extends Component {
  render() {
    const {
      onSuccess,
      onFailed,
      config: {
        levelCode,
      }
    } = this.props

    const samples = levelCode === 'levels#0' ? 2 : 4

    const selectedHorses = _.sample(_.shuffle(horses), samples)
    const horseIndex = Math.floor(Math.random() * (samples - 1))

    return (
      <Content style={styles.container}>
        <Grid style={{ marginTop: 20 }}>
          <Row style={{ textAlign: 'center', alignSelf: 'center' }}>
            <Col style={styles.main}>
              <Text style={styles.mainText}>
                { getBreed(selectedHorses[horseIndex]) }
              </Text>
            </Col>
          </Row>
          <Row>
            {selectedHorses.map((horse, i) => (
              <Col key={`options-${i+1}`} style={{ padding: 5 }}>
                <TouchableHighlight
                  onPress={_.isEqual(horse, selectedHorses[horseIndex]) ? onSuccess : onFailed}
                  style={styles.optionButton}
                >
                  <Image
                    source={getImage(horse)}
                    style={styles.optionImage}
                  />
                </TouchableHighlight>
              </Col>
            ))}
          </Row>
        </Grid>
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3bc32',
  },
  main: {
    resizeMode: 'contain',
    alignSelf: 'center',
    textAlign: 'center',
  },
  mainText: {
    fontSize: 50,
    alignSelf: 'center',
    color: 'white',
  },
  optionImage: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 120,
    width: 140,
  },
  optionButton: {
    alignSelf: 'center',
    marginTop: 40,
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(WordImageInteractionModeScreen)