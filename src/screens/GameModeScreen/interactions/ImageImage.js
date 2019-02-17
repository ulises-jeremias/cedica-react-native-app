import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'
import {
  Grid,
  Col,
} from 'react-native-easy-grid'
import {
  Image,
  StyleSheet,
} from 'react-native'
import {
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
    const {
      settings: {
        settings: {
          current,
        },
      },
    } = this.props

    const selectedHorses = _.sample(_.shuffle(horses), 4)

    return (
      <Content style={styles.container}>
        <Grid>
          {selectedHorses.map((horse, i) => (
            <Col key={`options-${i+1}`}>
              <Image
                source={getImage(horse)}
                resizeMode='contain'
                style={styles.optionImage}
              />
            </Col>
          ))}
        </Grid>
      </Content>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3bc32',
  },
  optionImage: {
    height: 150,
    width: 160,
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageImageInteractionModeScreen)