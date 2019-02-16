import React, { Component }  from 'react'
import { Content, ListItem, Text, Radio, Right, Left } from 'native-base'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Col, Row, Grid } from 'react-native-easy-grid'

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

class SettingsScreen extends Component {
  static navigationOptions = {
    title: 'Configuración',
  }

  componentDidMount() {

  }

  render() {
    return (
      <Grid>
        <Col>
          <Row>
            <Text>
              Modo Reconocimiento
            </Text>
            <Content>
              <ListItem>
                <Left>
                  <Text>Lista</Text>
                </Left>
                <Right>
                  <Radio selected={false} />
                </Right>
              </ListItem>
              <ListItem>
                <Left>
                  <Text>Grilla</Text>
                </Left>
                <Right>
                  <Radio selected={true} />
                </Right>
              </ListItem>
            </Content>
          </Row>
          <Row>
            <Text>2</Text>
          </Row>
        </Col>
        <Col>
          <Row>
            <Text>3</Text>
          </Row>
          <Row>
            <Text>4</Text>
          </Row>
        </Col>
      </Grid>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)