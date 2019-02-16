const viewModes = [
  'Lista',
  'Grilla',
]

const miniGames = [
  'Razas y Pelajes: Imagen - Palabra',
  'Razas y Pelajes: Palabra e Imagen',
  'Cruza: Imagen - Imagen',
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
    gameModes: optionsMapper('gameModes', gameModes),
    levels: optionsMapper('levels', levels),
    sounds: optionsMapper('sounds', sounds),
  }
}