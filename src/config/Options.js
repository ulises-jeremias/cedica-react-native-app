const viewModes = [
  'Lista',
  'Grilla',
]

const miniGames = [
  'Razas y Pelajes',
  'Razas y Pelajes Juntos',
  'Cruza',
]

const miniGameInteractions = [
  'Razas y Pelajes: Imagen - Palabra',
  'Razas y Pelajes: Palabra e Imagen',
  'Cruza: Imagen - Imagen',
]

const miniGameInteractionsConditions = [
  ({ lastWonGameLevel, actualGameLevel }) => lastWonGameLevel > 0 && lastWonGameLevel < 3 && actualGameLevel < 3,
  ({ lastWonGameLevel, actualGameLevel }) => lastWonGameLevel > 0 && lastWonGameLevel < 3 && actualGameLevel < 3,
  ({ actualGameLevel }) => actualGameLevel === 3
]

const gameModes = [
  'Razas y Pelajes',
  'Cruzas',
]

const levels = [
  'Facil',
  'Dificil',
]

const sounds = [
  'Masculina',
  'Femenina',
]

const optionsMapper = (name, options) => options.map((elem, i) => ({
  text: elem,
  code: `${name}#${i}`
}))

export default {
  settings: {
    viewModes: optionsMapper('viewModes', viewModes),
    miniGames: optionsMapper('miniGames', miniGames),
    miniGameInteractions: optionsMapper('miniGameInteractions', miniGameInteractions),
    miniGameInteractionsConditions,
    gameModes: optionsMapper('gameModes', gameModes),
    levels: optionsMapper('levels', levels),
    sounds: optionsMapper('sounds', sounds),
  }
}