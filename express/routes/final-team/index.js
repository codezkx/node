const express = require('express');

const router = express.Router();

router.post('/', (req, res, next) => {
    try {
        res.send(200, {
            code: 200,
            data: [
                {
                    name: 'JDG',
                },
                {
                    name: 'BGL',
                },
                {
                    name: 'LING',
                },
                {
                    name: 'WEB',
                },
            ],
            message: "OK",
            success: true
        });
    } catch (err) {
        next(err);
    }
});

module.exports = router;