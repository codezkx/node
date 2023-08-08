const express = require('./module/express')

const userRouter = require('./router/user.js')

const app = express();
app.use('/user', userRouter)
// app.use('/user', userRouter).get('path', (req, res) => {
//     const result = {
//         code: 200,
//         message: "OK",
//         data: {
//             useInfo: {
//                 userName: '神',
//                 message: '钦定的名额'
//             }
//         },
//         success: true
//     }
//     res.end(JSON.stringify(result));
// });

    // if (url === '/user') {

    // } else if(url === '/final/team') {
    //     const result = finalTeam();
    //     res.end(JSON.stringify(result));
    // } else {
    //     res.statusCode = 404
    //     res.statusMessage = '404 Not Found'
    //     res.end();
    // }