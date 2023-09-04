const NodeRSA = require('node-rsa');
const path = require('path');
const fs = require('fs').promises
const cerPath = path.join(process.cwd(), './auth');

async function generateKeys() {
    //实例化 b 秘钥位 bit 越大越安全 256 , 512, 1024 - 4096
    const newKey = new NodeRSA({ b: 512 });
    //设置秘钥模式
    newKey.setOptions({ encryptionScheme: 'pkcs1' });
    const public_key = newKey.exportKey('pkcs8-public');
    const private_key = newKey.exportKey('pkcs8-private');
    await fs.writeFile(path.join(cerPath, 'public.cer'), public_key);
    await fs.writeFile(path.join(cerPath, 'private.cer'), private_key);
}

//  加密
async function encrypt(plain) {
    let public_key = await fs.readFile(path.join(cerPath, 'public.cer'));
    const nodersa = new NodeRSA(public_key);
    prikey.setOptions({ encryptionScheme: 'pkcs1' });
    //调用加密方法  plain是需要加密的明文 加密生成的格式
    const encrypted = nodersa.encrypt(plain, 'base64');
    return encrypted
}

// 解密
async function decrypt(cipher) {
    let private_key = await fs.readFile(path.join(cerPath, 'private.cer'));
    //私钥实例化 NodeRSA
    let prikey = new NodeRSA(private_key);
    //设置 模式 scheme pkcs1
    prikey.setOptions({ encryptionScheme: 'pkcs1' });
    return prikey.decrypt(cipher, 'utf8');
}
generateKeys()

module.exports = {
    encrypt,
    decrypt,
}