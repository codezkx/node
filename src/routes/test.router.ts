import express, {type Router} from 'express';
import { successMessage } from '../utils/resMessage.ts';
import { authenticateToken } from '../middlewares/jwt.ts';

const router: Router = express.Router();

/* GET users listing. */
router.get('/testApi1', authenticateToken, function (req, res, next) {
  res.send(successMessage<string>('你好我是测试1'));
});

router.get('/testApi2', authenticateToken, function (req, res, next) {
  res.send(successMessage('你好我是测试2'));
});

export default router;
