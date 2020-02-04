var Tokens = require('csrf');
var tokens = new Tokens();

var secret = 'FTlSvmHwvDmM_2CFS5VlVD2V' || tokens.secretSync()
var token = tokens.create(secret)

console.log(secret, token);

if (!tokens.verify(secret, token)
  && !tokens.verify('FTlSvmHwvDmM_2CFS5VlVD2V', 'Fi5Pqj9H-VRByNmDrRGtv1lz0cJV182TSwgg')
  && !tokens.verify('FTlSvmHwvDmM_2CFS5VlVD2V', 'SplYHARh-kHfZUfJ7pM20H8dT_S3USHjRlig')
  && !tokens.verify('FTlSvmHwvDmM_2CFS5VlVD2V', 'dwU5Sqqa-sE5JJu3XYvrFmrxe7WWNPLvdU-c')
  && !tokens.verify('FTlSvmHwvDmM_2CFS5VlVD2V', 'DQXaGNBa-uCMxpZWcOabR1nBZ5eLOw7OH1lE')
) {
  throw new Error('invalid token!')
} else {
  console.log('success csrf token')
}