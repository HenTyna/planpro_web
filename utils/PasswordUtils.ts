import CryptoJS from 'crypto-js';
import { isNullOrWhiteSpace } from 'typescript-string-operations';

const Config = {
    key: process.env.NEXT_PUBLIC_PWD_ENCRYPTION_KEY || 'mytestkeyasdddds', // Use same default as production
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
}

export const PasswordUtils = {
    encrypt,
    decrypt
}

function getKey() {
    return CryptoJS.SHA256(Config.key)
}

function encrypt(plainText: string) {
    const key = getKey();
    // Use a fixed IV derived from the key to ensure deterministic encryption
    const iv = CryptoJS.enc.Utf8.parse(String(key).substring(0, 16));

    const encrypted = CryptoJS.AES.encrypt(plainText, key, {
        iv: iv,
        mode: Config.mode,
        padding: Config.padding,
    });
    return encrypted.toString();
}

function decrypt(encryptedText: string) {
    // if(isNullOrWhiteSpace(encryptedText)) return '';
    const key = getKey();
    // Use the same fixed IV derived from the key
    const iv = CryptoJS.enc.Utf8.parse(String(key).substring(0, 16));

    const decrypted = CryptoJS.AES.decrypt(encryptedText, key, {
        iv: iv,
        mode: Config.mode,
        padding: Config.padding
    });
    return decrypted.toString(CryptoJS.enc.Utf8)
}