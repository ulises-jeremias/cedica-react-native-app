import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import {
  Col,
  Grid,
  Row,
} from 'react-native-easy-grid'
import {
  StyleSheet,
  TouchableHighlight,
} from 'react-native'
import {
  Content,
} from 'native-base'

import AsyncImage from '../../../components/AsyncImage'
import settingsActions from '../../../actions/settings-actions'
import { crosses, getImage, getSound } from '../../../config/Horses'

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
    const {
      onSuccess,
      onFailed,
      config: {
        levelCode,
      }
    } = this.props

    const samples = levelCode === 'levels#0' ? 2 : 4

    const selectedHorses = _.sample(_.shuffle(crosses), samples)
    const horseIndex = Math.floor(Math.random() * (samples - 1))

    const cmp = horse => {
      return (_.isEqual(horse.mother, selectedHorses[horseIndex].mother) &&
              _.isEqual(horse.father, selectedHorses[horseIndex].father))

    }

    return (
      <Content style={styles.container}>
        <Grid style={{ marginTop: hp('3%') }}>
          <Row style={{ textAlign: 'center', alignSelf: 'center' }}>
            <Col>
              <AsyncImage
                style={styles.mainImage}
                source={getImage(selectedHorses[horseIndex].mother)}
              />
            </Col>
            <Col>
              <AsyncImage
                style={styles.mainImage}
                source={getImage(selectedHorses[horseIndex].father)}
              />
            </Col>
          </Row>
          <Row>
            {selectedHorses.map((cross, i) => (
              <Col key={`options-${i+1}`} style={{ padding: 5 }}>
                <TouchableHighlight
                  onPress={cmp(cross) ? onSuccess : onFailed}
                  style={styles.optionButton}
                >
                  <AsyncImage
                    source={getImage(cross.horse)}
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
  mainImage: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: hp('45%'),
    width: hp('50%'),
  },
  optionImage: {
    resizeMode: 'contain',
    alignSelf: 'center',
    height: hp('22%'),
    width: wp('27%'),
  },
  optionButton: {
    alignSelf: 'center',
    marginTop: hp('6%'),
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageImageInteractionModeScreen)