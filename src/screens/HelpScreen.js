import React from 'react'
import { ScrollView, StyleSheet } from 'react-native'

import {
  List,
  ListItem,
  Text,
} from 'native-base'

import {
  blue
} from '../config/Colors'

export default class HelpScreen extends React.Component {
  static navigationOptions = {
    title: 'Ayuda',
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <List>
          <ListItem noIndent style={styles.itemHeader}>
            <Text>
              Minijuegos
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              - Razas y Pelajes: identificar razas y pelajes de manera individual.
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              - Razas y Pelajes juntas: identificar la raza y el pelaje de cada caballo en forma conjunta.
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              - Cruza: identificar cruzas de razas entre varias opciones, esto es dados dos caballos, elegir la cruza correcta. 
            </Text>
          </ListItem>

          <ListItem noIndent style={styles.itemHeader}>
            <Text>
              Interacciones
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              - Interacción A: dada una imagen, se la debe asociar a una palabra con su audio mediante la selección entre varias palabras (Minijuego 1 y 2)
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              - Interacción B: dada una palabra con su audio, se la debe asociar a una imagen mediante la selección entre varias imágenes (Minijuego 1 y 2)
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              - Interacción C: dada una imagen, se la debe asociar con otra imagen mediante la selección entre varias imágenes (Minijuego 3)
            </Text>
          </ListItem>

          <ListItem noIndent style={styles.itemHeader}>
            <Text>
              Niveles
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              - Nivel 1: se elige una opción (imagen o palabra con audio) entre 2 disponibles.
            </Text>
          </ListItem>
          <ListItem>
            <Text>
              - Nivel 2: se elige una opción entre 4 (imagen o palabra con audio) disponibles.
            </Text>
          </ListItem>
        </List>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: '#fff',
  },
  itemHeader: {
    backgroundColor: '#cde1f9',
  },
})
