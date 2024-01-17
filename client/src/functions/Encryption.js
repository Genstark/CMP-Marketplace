import CryptoJS from 'crypto-js';

export function Encryption(password){
    const ciphertext = CryptoJS.AES.encrypt(password, 'secret key 123').toString();
    return ciphertext;
}


export function Decrypt(passowrd){
    const bytes = CryptoJS.AES.decrypt(passowrd, 'secret key 123');
    const plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;
}