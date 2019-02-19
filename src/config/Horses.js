export const horses = [
  'amapola-petiso_argentino-rosillo.png',
  'ambar-mestizo_cruza_arabe-alazan_tostado.png',
  'angola-spc-zainocolorado.png',
  'antu-Mestizo-overo_zaino.png',
  'bionda-mestizo-alazán_ruano.png',
  'blanco-mestizo-blanco.png',
  'bonita-mestizo_qh_con_criollo-overo_azulejo.png',
  'cacique-mestizo-alazan.png',
  'candelaria-mestizo-tobiano.png',
  'ciro-mestizo-tordillo_canela.png',
  'felipe-mestizo-zaino.png',
  'hualfín-criollo-horsepicaso.png',
  'juana-cuarto_de_milla-bayo.png',
  'mora-petiso_argentino-tordillo_moro.png',
  'muñeco-mestizo-overo_rosado.png',
  'nala-mestizo-moro.png',
  'pamperito-petiso_argentino-zaino.png',
  'pintada-mestizo-alazan_pintado.png',
  'pochito-mestizo-zaino.png',
  'primavera-silla_argentino-alazan.png',
  'tigre-criollo-bayo_gateado.png',
  'tupac-mestizo-zaino_oscuro.png',
  'zorzal-mestizo-tordillo.png',
]

const images = {
  'amapola-petiso_argentino-rosillo.png': require('../../assets/images/Caballos/amapola-petiso_argentino-rosillo.png'),
  'ambar-mestizo_cruza_arabe-alazan_tostado.png': require('../../assets/images/Caballos/ambar-mestizo_cruza_arabe-alazan_tostado.png'),
  'angola-spc-zainocolorado.png': require('../../assets/images/Caballos/angola-spc-zainocolorado.png'),
  'antu-Mestizo-overo_zaino.png': require('../../assets/images/Caballos/antu-Mestizo-overo_zaino.png'),
  'bionda-mestizo-alazán_ruano.png': require('../../assets/images/Caballos/bionda-mestizo-alazán_ruano.png'),
  'blanco-mestizo-blanco.png': require('../../assets/images/Caballos/blanco-mestizo-blanco.png'),
  'bonita-mestizo_qh_con_criollo-overo_azulejo.png': require('../../assets/images/Caballos/bonita-mestizo_qh_con_criollo-overo_azulejo.png'),
  'cacique-mestizo-alazan.png': require('../../assets/images/Caballos/cacique-mestizo-alazan.png'),
  'candelaria-mestizo-tobiano.png': require('../../assets/images/Caballos/candelaria-mestizo-tobiano.png'),
  'ciro-mestizo-tordillo_canela.png': require('../../assets/images/Caballos/ciro-mestizo-tordillo_canela.png'),
  'felipe-mestizo-zaino.png': require('../../assets/images/Caballos/felipe-mestizo-zaino.png'),
  'hualfín-criollo-horsepicaso.png': require('../../assets/images/Caballos/hualfín-criollo-horsepicaso.png'),
  'juana-cuarto_de_milla-bayo.png': require('../../assets/images/Caballos/juana-cuarto_de_milla-bayo.png'),
  'mora-petiso_argentino-tordillo_moro.png': require('../../assets/images/Caballos/mora-petiso_argentino-tordillo_moro.png'),
  'muñeco-mestizo-overo_rosado.png': require('../../assets/images/Caballos/muñeco-mestizo-overo_rosado.png'),
  'nala-mestizo-moro.png': require('../../assets/images/Caballos/nala-mestizo-moro.png'),
  'pamperito-petiso_argentino-zaino.png': require('../../assets/images/Caballos/pamperito-petiso_argentino-zaino.png'),
  'pintada-mestizo-alazan_pintado.png': require('../../assets/images/Caballos/pintada-mestizo-alazan_pintado.png'),
  'pochito-mestizo-zaino.png': require('../../assets/images/Caballos/pochito-mestizo-zaino.png'),
  'primavera-silla_argentino-alazan.png': require('../../assets/images/Caballos/primavera-silla_argentino-alazan.png'),
  'tigre-criollo-bayo_gateado.png': require('../../assets/images/Caballos/tigre-criollo-bayo_gateado.png'),
  'tupac-mestizo-zaino_oscuro.png': require('../../assets/images/Caballos/tupac-mestizo-zaino_oscuro.png'),
  'zorzal-mestizo-tordillo.png': require('../../assets/images/Caballos/zorzal-mestizo-tordillo.png'),
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substring(1).toLowerCase();
}

export function getName(horse) {
  return capitalize(horse.split('-')[0].replace(/\_/g, ' '))
}

export function getRace(horse) {
  return capitalize(horse.split('-')[1].replace(/\_/g, ' '))
}

export function getFur(horse) {
  return capitalize(horse.split('-')[2].replace('.png', '').replace(/\_/g, ' '))
}

export function getImage(horse) {
  return images[horse]
}

export default {
  horses,
  getRace,
  getName,
  getImage,
  getFur,
}