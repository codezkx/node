const crypto = require('crypto');
const path = require('path');
const fs = require('fs')
const cerPath = path.join(process.cwd(), './auth');

const createKeys = () => {
    // 生成新的RSA密钥对
    const {publicKey, privateKey} = crypto.generateKeyPairSync('rsa', {
        modulusLength: 2048,
    });
    // 将公钥转换为PEM格式的字符串   node 版本改变这里可能还会变
    const publicKeyPem = publicKey.export({type: 'spki', format: 'pem'}).toString();
    const privateKeyPem = privateKey.export({type: 'pkcs8', format: 'pem'}).toString();
    return {publicKeyPem, privateKeyPem};
}

const getPubKeyPem = () => {
    // 读取公钥文件
    const filepath = getFilepath('public.pem');  // D:\projects\node\core\auth\public.pem
    const publicKey = fs.readFileSync(filepath, 'utf8');
    if (!publicKey) {
        const { publicKeyPem, privateKeyPem } = createKeys();
        setPubKeyPem(publicKeyPem);
        setPrivateKeyPem(privateKeyPem);
        return publicKeyPem
    }
    return publicKey
}

const getPrivateKeyPem = () => {
    // 读取私钥文件
    const filepath = getFilepath('private.pem');
    const privateKey = fs.readFileSync(filepath, 'utf8');
    if (!privateKey) {
        const { publicKeyPem, privateKeyPem } = createKeys();
        setPubKeyPem(publicKeyPem);
        setPrivateKeyPem(privateKeyPem);
    }
    return privateKey;
}

const setPubKeyPem = (pubKey) => {
    // 写入公钥文件
    const filepath = getFilepath('public.pem')
    fs.writeFileSync(filepath, pubKey);
}

const setPrivateKeyPem = (priKey) => {
    const filepath = getFilepath('private.pem');
    fs.writeFileSync(filepath, priKey)
}

const getFilepath = (fileName) => {
    const filepath = path.join(process.cwd(), 'auth', fileName);
    return filepath;
}

function privateDecrypt(encrypted) {
    try {
        let decryptedBuffer = null
        const privateKeyPem = getPrivateKeyPem();
        const privateKey = crypto.createPrivateKey(privateKeyPem)
        const encryptedData = Buffer.from(encrypted, 'base64');
        // 使用私钥进行解密
        decryptedBuffer = crypto.privateDecrypt(
            {
              key: privateKey,
            //   padding: crypto.constants.RSA_PKCS1_PADDING, // 根据加密时的填充方式选择 node 22版本不支持
              padding: crypto.constants.RSA_PKCS1_OAEP_PADDING, // 根据加密时的填充方式选择
              oaepHash: 'sha256',
            },
            encryptedData
          );
        return JSON.parse(decryptedBuffer.toString('utf8'))
    } catch(err) {
        console.log(err)
    }
}

module.exports = {
    getPubKeyPem,
    getPrivateKeyPem,
    privateDecrypt
}