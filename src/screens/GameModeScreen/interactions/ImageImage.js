import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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

    return null
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ImageImageInteractionModeScreen)