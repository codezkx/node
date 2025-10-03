import express, {type Router, type Request}  from 'express';
import { privateDecrypt } from '../utils/rsaControl.ts';
import { generateToken, generateReFreshToken,authenticateToken } from '../middlewares/jwt.ts';
import { successMessage, errMessage } from '../utils/resMessage.ts';
// import type { RequestConfig } from '../types/type.d.ts';

const router: Router = express.Router();

// 无感刷新token,authenticateToken用上之前写的鉴权中间件,鉴别token是否有效
router.get('/refreshToken', authenticateToken, (req, res) => {
  const { username, password } = req.user;
  // 新tokenw
  const token = generateToken({username});
  const refreshToken = generateReFreshToken({username});
  res.send(
    successMessage({
      token,
      refreshToken
    })
  )
})

/* GET users listing. */
router.post('/login', function (req, res, next) {
  const {username, password} = privateDecrypt(req.body.encrypted);
  console.log(username, password)
  if (username === 'admin' && password === 'admin123') {
    const token = generateToken({username}) // 签发token的时候把用户名带上
    const refreshToken = generateReFreshToken({username}) // 登录时将refreshToken也返回
    res.send(successMessage({
      token,
      refreshToken
    }));
    
  }
  res.send(errMessage({
    data: '',
    err: "没有找到用户",
  }));
});

export default router;
