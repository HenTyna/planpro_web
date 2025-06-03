import CryptoJS from 'crypto-js';

const Config = {
  key: process.env.NEXT_PUBLIC_PWD_ENCRYPTION_KEY || '',
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.Pkcs7
};

function getKey(){
  return CryptoJS.SHA256(Config.key)
}

function getKeyAndIV() {
  const keyBytes = CryptoJS.SHA256(Config.key);
  const ivBytes = CryptoJS.lib.WordArray.create(keyBytes.words.slice(0, 4)); // 4 * 4 bytes = 16 bytes
  return { key: keyBytes, iv: ivBytes };
}

function encrypt(plainText: string) {
  const { key, iv } = getKeyAndIV();

  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv,
    mode: Config.mode,
    padding: Config.padding,
  });

  return encrypted.toString(); // Base64
}

function decrypt(encryptedText: string){
  // if(isNullOrWhiteSpace(encryptedText)) return '';
  const key = getKey();

  const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
      iv: CryptoJS.enc.Utf8.parse(String(key).substring(0,16)),
      mode: Config.mode,
      padding: Config.padding
  });
  return decrypted.toString(CryptoJS.enc.Utf8)
}

export const PasswordUtils = {
  encrypt,
  decrypt
};
