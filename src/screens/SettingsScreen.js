import React, { Component, Fragment }  from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Body,
  CheckBox,
  Content,
  Form,
  Icon,
  Left,
  ListItem,
  Picker,
  Radio,
  Right,
  Text,
} from 'native-base'

import settingsActions from '../actions/settings-actions'
import { settings } from '../config/Options'

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
    const {
      miniGameOptions,
    } = settings

    const {
      settings: {
        settings: {
          fields: {
            miniGameCode,
          }
        }
      }
    } = this.props

    return (
      <Fragment>
        <Content>
          <ListItem itemDivider>
            <Text>Modo de Reconocimiento</Text>
          </ListItem> 
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
          <ListItem itemDivider>
            <Text />
          </ListItem>
          <ListItem>
            <Body>
              <Text>Razas y Pelajes</Text>
            </Body>
            <CheckBox checked={true} />
          </ListItem>
          <ListItem>
            <Body>
              <Text>Cruzas</Text>
            </Body>
            <CheckBox checked={true} />
          </ListItem>
          <ListItem itemDivider>
            <Text>
              Minijuego
            </Text>
          </ListItem>
          
          {Array.from(miniGameOptions || []).map(miniGame => (
            <ListItem>
              <Left>
                <Text>
                  {miniGame.text}
                </Text>
              </Left>
              <Right>
                <Radio selected={fields.miniGameCode === miniGame.code} />
              </Right>
            </ListItem>
          ))}

          <ListItem itemDivider>
            <Text>
              Nivel de Dificultad
            </Text>
          </ListItem>
          <ListItem>
            <Content>
              <Form>
                <Picker
                  mode='dropdown'
                  iosIcon={<Icon name='arrow-down' />}
                  style={{ width: undefined }}
                  selectedValue='key0'
                >
                  <Picker.Item label='Facil' value='key0' />
                  <Picker.Item label='Dificil' value='key1' />
                </Picker>
              </Form>
            </Content>
          </ListItem>
          <ListItem itemDivider>
            <Text>
              Sonido
            </Text>
          </ListItem>
          <ListItem>
            <Content>
              <Form>
                <Picker
                  mode='dropdown'
                  iosIcon={<Icon name='arrow-down' />}
                  style={{ width: undefined }}
                  selectedValue='key0'
                >
                  <Picker.Item label='Masculino' value='key0' />
                  <Picker.Item label='Femenino' value='key1' />
                </Picker>
              </Form>
            </Content>
          </ListItem>
        </Content>
      </Fragment>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen)