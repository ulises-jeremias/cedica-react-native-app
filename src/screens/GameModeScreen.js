import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import settingsActions from '../actions/settings-actions'

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

class GameModeScreen extends Component {
  static navigationOptions = {
    title: 'Juego',
  }

  render() {
    const {
      navigation: {
        navigate,
      },
      settings: {
        settings: {
          current,
        },
      },
    } = this.props

    return null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameModeScreen)