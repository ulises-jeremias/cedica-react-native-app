import React, { Component, Fragment }  from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {
  Body,
  Button,
  CheckBox,
  Content,
  Form,
  Header,
  Icon,
  Left,
  ListItem,
  Picker,
  Radio,
  Right,
  Text,
} from 'native-base'

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
          <ListItem>
            <Left>
              <Text>
                Razas y Pelajes: Imagen - Palabra
              </Text>
            </Left>
            <Right>
              <Radio selected={true} />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>
                Razas y Pelajes: Palabra e Imagen
              </Text>
            </Left>
            <Right>
              <Radio selected={false} />
            </Right>
          </ListItem>
          <ListItem>
            <Left>
              <Text>
                Cruza: Imagen - Imagen
              </Text>
            </Left>
            <Right>
              <Radio selected={false} />
            </Right>
          </ListItem>
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