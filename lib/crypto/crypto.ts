import * as Crypto from 'expo-crypto';

export async function generateUUID() {
  const randomBytes = await Crypto.getRandomBytesAsync(16);
  const uuid = [
    randomBytes[0].toString(16).padStart(2, '0'),
    randomBytes[1].toString(16).padStart(2, '0'),
    randomBytes[2].toString(16).padStart(2, '0'),
    randomBytes[3].toString(16).padStart(2, '0'),
    '-',
    randomBytes[4].toString(16).padStart(2, '0'),
    randomBytes[5].toString(16).padStart(2, '0'),
    '-',
    randomBytes[6].toString(16).padStart(2, '0'),
    randomBytes[7].toString(16).padStart(2, '0'),
    '-',
    randomBytes[8].toString(16).padStart(2, '0'),
    randomBytes[9].toString(16).padStart(2, '0'),
    '-',
    randomBytes[10].toString(16).padStart(2, '0'),
    randomBytes[11].toString(16).padStart(2, '0'),
    randomBytes[12].toString(16).padStart(2, '0'),
    randomBytes[13].toString(16).padStart(2, '0'),
    randomBytes[14].toString(16).padStart(2, '0'),
    randomBytes[15].toString(16).padStart(2, '0'),
  ].join('');

  return uuid;
}