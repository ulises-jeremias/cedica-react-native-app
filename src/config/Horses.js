export const horses = [
  'angola-spc-zainocolorado',
  'bionda-cruzárabe-alazán_ruano',
  'bonita-mestizo_qh_con_criollo-overo_azulejo',
  'candelaria-mestizo-tobiano',
  'ciro-mestizo-tordillo_canela',
  'hualfín-criollo-horsepicaso',
  'juana-cuarto_de_milla-bayo',
]

const images = {
  'angola-spc-zainocolorado': require('../../assets/images/Caballos/angola-spc-zainocolorado.png'),
  'bionda-cruzárabe-alazán_ruano': require('../../assets/images/Caballos/bionda-cruzárabe-alazán_ruano.png'),
  'bonita-mestizo_qh_con_criollo-overo_azulejo': require('../../assets/images/Caballos/bonita-mestizo_qh_con_criollo-overo_azulejo.png'),
  'candelaria-mestizo-tobiano': require('../../assets/images/Caballos/candelaria-mestizo-tobiano.png'),
  'ciro-mestizo-tordillo_canela': require('../../assets/images/Caballos/ciro-mestizo-tordillo_canela.png'),
  'hualfín-criollo-horsepicaso': require('../../assets/images/Caballos/hualfín-criollo-horsepicaso.png'),
  'juana-cuarto_de_milla-bayo': require('../../assets/images/Caballos/juana-cuarto_de_milla-bayo.png'),
}

export function getRace(horse) {
  return horse.split('-')[0]
}

export function getCrosse(horse) {
  return horse.split('-')[1]
}

export function getFur(horse) {
  return horse.split('-')[2]
}

export function getImage(horse) {
  return images[horse]
}

export default {
  horses,
  getRace,
  getCrosse,
  getImage,
  getFur,
}