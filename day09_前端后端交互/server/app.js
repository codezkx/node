const expres = require('./module/express');
const app = expres();
const userRouter = require('./router/user.js');
app.use('/user', userRouter);
