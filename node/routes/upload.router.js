const path = require('path');
const fs = require('fs');
const express = require('express');
const multer = require("Multer");
const router = express.Router();
const { uploadPath, maxFileSize } = require('../config')
const fileController = require('../controller/file.controller')


const storage = multer.diskStorage({
  //存储位置
  destination (req, res, cb) {
    const filePath = path.join(uploadPath, 'images');
    fs.existsSync(filePath) || fs.mkdirSync(filePath);
    cb(null, filePath);
  },
  filename(req, file, cb) {
    const { ext, base, name } = path.parse(file.originalname)
    cb(null, name + '_' + Date.now() + ext);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize:  102400000000,
  }
})

/* GET users listing. */
router.post('/upload', upload.any(), fileController.create);
router.get('/images/:id', fileController.getImage);


module.exports = router;
