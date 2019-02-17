import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Image,
  StyleSheet,
} from 'react-native'
import {
  Content,
  Text,
} from 'native-base'

import settingsActions from '../../../actions/settings-actions'

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

    return (
      <Content style={styles.container}>
        <Text>
          Hola
        </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(ImageImageInteractionModeScreen)