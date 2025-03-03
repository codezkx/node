const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require("multer");
const crypto = require("crypto");
const multiparty = require("multiparty")
const router = express.Router();

const { successMessage, errMessage } = require('../core/utils/resMessage.js')


const UPLOAD_DIR = path.resolve(process.cwd(), "./public", "./file"); // 完整文件存放在file下,每个文件的片存在文件md5命名的文件夹下

/**
 * @message: 检查文件之前上传情况: 未上传,上传一部分,已上传
 * @param {*} md5 完整文件唯一标识
 * @param {*} suffix 文件后缀
 * @return {*} list 已上传文件片段名列表
 */
router.get("/getUploadDetial", (req, res) => {
  const { md5, suffix } = req.query;
  let list = [];
  let data = { isUploaded: false, list };
  const { filePath, dirPath } = getDirPathAndFilePath(md5, suffix);

  // 判断文件路径是否存在
  const isUploaded = fs.existsSync(filePath);
  if (isUploaded) {
    // 如果存在则不需要在上传了
    data = { ...data, isUploaded };
  }

  const isUploading = fs.existsSync(dirPath);
  if (isUploading) {
    // 读取目录的内容(就是返回一个文件名列表)
    list = fs.readdirSync(dirPath);
    list = sortFiles(list);
    data = { ...data, list };
  }

  res.send(successMessage(data));
});

/**
 * @message: 文件片段以index-MD5.suffix命名保存在md5命名的文件夹中
 * @param {*} md5 完整文件唯一标识
 * @param {*} chunkName 当前文件片段名称
 * @param {*} suffix 文件后缀
 * @param {*} file 文件片段内容
 */
router.post("/upload", (req, res) => {
  const form = new multiparty.Form();
  let isSuccess = false;
  let err = null;

  form.parse(req, async (error, fields, files) => {
    if (error) {
      err = error;
      res.send(errMessage(null, err));
    } else {
      isSuccess = await saveFile(fields, files);
    }
    res.send(successMessage(null, isSuccess, err));
  });
});

/**
 * @message: 合并md5命名文件夹内所有文件,并删除该文件夹,合并后检查文件的md5是否一致
 * @param {*} md5 完整文件唯一标识
 * @param {*} suffix 文件后缀
 */
router.get("/mergeFile", async (req, res) => {
  const { md5, suffix } = req.query;
  const { dirPath, filePath } = getDirPathAndFilePath(md5, suffix);

  mergeFile(dirPath, filePath);

  const isSame = await isSameFile(filePath, md5);
  if (!isSame) {
    fs.unlinkSync(filePath);
    res.send({ success: false, err: "文件已经损坏请重新上传!", data: null });
    return;
  }

  res.send(successMessage(null));
});

async function isSameFile(filePath, md5) {
  let currMd5 = await getMd5byFile(filePath);
  return currMd5 === md5;
}

function getMd5byFile(filePath) {
  return new Promise((resolve, reject) => {
    // 创建文件流
    const readStream = fs.createReadStream(filePath);
    const hash = crypto.createHash("md5");

    readStream.on("data", (chunk) => {
      hash.update(chunk);
    });
    readStream.on("end", () => {
      const fileMd5 = hash.digest("hex");
      resolve(fileMd5);
    });
    readStream.on("error", (err) => {
      reject(err);
    });
  });
}

function mergeFile(dirPath, filePath) {
  // 读取目录下的所有文件
  let list = fs.readdirSync(dirPath);
  // 对其目录下的文件进行排序
  list = sortFiles(list);
  list.forEach((item) => {
    // 生成文件路径
    const chunkPath = path.join(dirPath, item);
    // 读取文件
    const buffer = fs.readFileSync(chunkPath);
    // 将对应的文件添加到filePath文件中
    fs.appendFileSync(filePath, buffer);
    // 取消链接
    fs.unlinkSync(chunkPath);
  });
  // 删除对应目录
  fs.rmdirSync(dirPath);
}

function createDir(dirPath) {
  const hasDir = fs.existsSync(dirPath);
  if (!hasDir) {
    fs.mkdirSync(dirPath);
  }
}

function getDirPathAndFilePath(md5, suffix) {
  const dirPath = path.join(UPLOAD_DIR, `./${md5}`);
  const filePath = path.join(UPLOAD_DIR, `./${md5}.${suffix}`);
  return { dirPath, filePath };
}

function whitFile(dirPath, chunkName, file) {
  return new Promise((resolve, reject) => {
    const fragmentPath = path.join(dirPath, `./${chunkName}`);
    const buffer = fs.readFileSync(file.path);
    fs.writeFile(fragmentPath, buffer, (err) => {
      if (err) {
        resolve(false);
      }
      resolve(true);
    });
  });
}

async function saveFile(fields, files) {
  const { md5, chunkName, suffix } = fields;
  const { dirPath, filePath } = getDirPathAndFilePath(md5, suffix);
  const hasFile = fs.existsSync(filePath);
  if (!hasFile) {
    createDir(dirPath);
    return await whitFile(dirPath, chunkName, files.file[0]);
  }
  return true;
}

function sortFiles(list) {
  list.sort((a, b) => {
    const aRes = a.match(/^(\d+)-(.+)$/);
    const bRes = b.match(/^(\d+)-(.+)$/);
    return aRes[1] - bRes[1];
  });
  return list;
}

module.exports = router;
