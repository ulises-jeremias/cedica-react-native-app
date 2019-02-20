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
} from 'react-native'
import {
  Button,
  Content,
  Text,
} from 'native-base'

import settingsActions from '../../../actions/settings-actions'
import { horses, getImage } from '../../../config/Horses'

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

class ImageImageInteractionModeScreen extends Component {
  render() {
    const selectedHorses = _.sample(_.shuffle(horses), 5)

    return (
      <Content style={styles.container}>
        <Grid style={{ marginTop: 20 }}>
          <Row>
            <Col>
              <Image
                source={getImage(selectedHorses.pop())}
                style={styles.mainImage}
              />
            </Col>
          </Row>
          <Row>
            {selectedHorses.map((horse, i) => (
              <Col key={`options-${i+1}`} style={{ padding: 5 }}>
                <Button
                  onPress={() => {}}
                  style={styles.optionButton}
                  transparent
                >
                  <Image
                    source={getImage(horse)}
                    style={styles.optionImage}
                  />
                </Button>
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
  mainImage: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: 200,
    width: 340,
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

export default connect(mapStateToProps, mapDispatchToProps)(ImageImageInteractionModeScreen)