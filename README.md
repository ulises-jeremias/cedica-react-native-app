# CEDICA

## React Native App

* * *

## Ambiente de desarrollo

Para levantar el ambiente de desarrollo, primero se deben instalar las
dependencias ejecutando los siguientes comandos en la linea de comandos:

```bash
$ yarn
$ react-native link
```

**Terminal A**

Servimos los JS, permitiendo una suerte de hot reload.

```bash
$ yarn start
```

**Terminal B**

Genera e instala apk-debug. Cuando anda no cierra la conexión.

```bash
$ yarn bundle:android
$ yarn android
```

## Desarrollo de la APP

Para desarrollar una nueva pantalla se deben tener en cuenta 2 directorios como
mínimo, `src/screens` y `src/navigator`

### `src/screens`

En este directorio se almacenan las diferentes pantallas de la APP.
En estas componentes se puede acceder al estado interno, realizar consultas, o
renderizar otras componentes.

### `src/navigator`

En este directorio, se declaran los nombres con los cuales se van a referenciar
a las pantallas para movernos por nuestra app.
Normalmente, las nuevas rutas irían al archivo `src/navigator/MainNavigator.js`,
donde se importan las pantallas. El nombre con el cual se importen es como van a
ser conocidas dentro de nuestra app.

Por ejemplo, para agregar una pantalla de `Test`, se deberían agregar las
siguientes líneas al archivo

```javascript
...

import Test from '../screens/TestScreen'

export default createStackNavigator({
  ...
  Test,
})
```

Luego, para movernos a esta pantalla, se puede usar la función
`navigation.navigate('Test')`

__Notar que `navigation` es accecible desde las screen en `this.props`__

### Otros directorios

#### `src/components`

Si se quiere generalizar una componente de **visualización**, se puede hacer
en este directorio.

__Notar que estas componentes, no **deberían** acceder al estado interno (redux), ni a navigation, ni realizar consultas__

#### `src/actions`, `src/constants`, `src/reducer` y `src/state`

Todos estos directorios se corresponden con Redux y ReactRedux

Redux nos sirve para contar con un estado centralizado, inmutable, gestionado
por funciones denominadas `actions`

Para más información, se puede consultar la página de Redux

#### `src/config`

Cuenta con configuración importante de la app, como son, los mapeos de caballos
a sus archivos, los gif para los juegos y el mapeo de las opciones de la
configuración.

#### `src/helpers`

Son funciones que simplifican ciertos aspectos del desarrollo.

## Construir un APK de producción

Para construir un APK, es necesario instalar las dependencias y general la aplicación para android
de la siguiente forma:

```bash
$ yarn
$ react-native link
$ yarn build:prod:android
```
