import Pbkdf2 from 'crypto-js/pbkdf2'
import CryptoJS from 'crypto-js/crypto-js'

export function decryptAES(encryptedText, iv, key) {
  const ivHex = CryptoJS.enc.Utf8.parse(iv);
  const secret = CryptoJS.enc.Utf8.parse(key);

  const bytes = CryptoJS.AES.decrypt(encryptedText, secret, {iv:ivHex, mode: CryptoJS.mode.CBC});
  const result = bytes.toString(CryptoJS.enc.Utf8);

  return result
}

export function encryptAES(decryptedText, iv, key) {
  const ivHex = CryptoJS.enc.Utf8.parse(iv);
  const secret = CryptoJS.enc.Utf8.parse(key);

  const bytes = CryptoJS.AES.encrypt(decryptedText, secret, {iv:ivHex, mode: CryptoJS.mode.CBC});
  const result = bytes.toString();

  return result
}

/** @return {{iv: string, key: string}} */
export function getOfdEncryptionConfig() {
  return {
    key: localStorage.getItem('OFD_ENCRYPT_KEY'),
    iv: localStorage.getItem('OFD_ENCRYPT_IV')
  }
}

export function setOfdEncryptionConfig(iv, key) {
  localStorage.setItem('OFD_ENCRYPT_KEY', key)
  localStorage.setItem('OFD_ENCRYPT_IV', iv)
}
