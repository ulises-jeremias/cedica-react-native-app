# CEDICA

## React Native App

* * *

## Ambiente de desarrollo

Para levantar el ambiente de desarrollo, primero se deben instalar las
dependencias ejecutando los siguientes comandos en la linea de comandos:

```bash
$ yarn
$ yarn android
```

Una vez levantado `expo`, se muestra una pantalla con un código QR que se debe
escanear desde la aplicación de expo (disponible en android y ios).

Esto abrirá automáticamente nuestra aplicación en el teléfono, la cual
construirá y descargará la app.

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
$ yarn build:android
```

__Notar que se debe contar con una cuenta de expo__

* * *
  
## Utilizando Emulador 

```bash
$ emulator -list-avds
$ emulator @name
```

* * *

## Notas de Uso

Bueno, para no olvidarme voy a dejar constancia de todo lo que hice para que ande con hot reloading y etc. Primero necesité variables de ambiente con los path de Android SDK. Para esto
ejecutamos lo siguiente en la terminal:

```bash
$ export ANDROID_HOME="$HOME/Android/Sdk"
$ export PATH=$PATH:$HOME/Android/Sdk/tools:$HOME/Android/Sdk/platform-tools
```

Despues, instalamos todas las dependencias del repo. Me sorprendió que muchísimia gente de la comunidad recomendaba borrar `node_modules`. A mi no me pareció necesario, así que solo hice lo siguiente:

```bash
$ yarn
$ react-native link
```

Va a ser importante reinstalar porque tuve que instalar una nueva dependencia,
`react-native-gesture-handler` la cual fué necesaria para compatibilidad con determinados
dispositivos. Sorpresa! Se necesita para casi todos jajaja

Despues, lo más importante, tuve que cambiar el nombre del rootDir en el `settings.gradle`
de android, dado que se necesita que sea el nombre del repo o en si, el nombre del root dir, sea cual sea. En mi caso queda así, que es como quedaría con cualquier `clone` al repo.

```java
rootProject.name = 'cedica-react-native-app'

include ':react-native-gesture-handler'
project(':react-native-gesture-handler').projectDir = new File(rootProject.projectDir, '../node_modules/react-native-gesture-handler/android')

include ':app'
```

Cabe destacar que al hacer `react-native link` se modificó dicho archivo para requerir algunas
dependencias para el gesture handler.

Despues lo que queda es simple. Por un lado servir los JS y por otro generar la apk instalable de debug.

Primero conectamos el dispositivos, (a mi no me funca el emulador así que lo usé en el celu y va bien). Y después correr en dos terminales diferentes los siguientes comandos:

**Terminal A**

Servimos los JS, permitiendo una suerte de hot reload.

```bash
$ yarn start
```

**Terminal B**

Genera e instala apk-debug. Cuando anda no cierra la conexión.

```bash
$ yarn android-linux
```

