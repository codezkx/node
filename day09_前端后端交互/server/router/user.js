const executiveRequest = async () => {
    const express = await require('../module/router');
    const router = express.Router();
    router.get('/' ,(req, res) => {
        const result = {
            code: 200,
            message: "OK",
            data: {
                useInfo: {
                    userName: '神',
                    message: '钦定的名额'
                }
            },
            success: true
        }
        res.end(JSON.stringify(result));
    })
}

module.exports = executiveRequest;
