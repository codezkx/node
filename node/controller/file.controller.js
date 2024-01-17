const fileServer = require('../server/file.server');

class FileController {
    async create(req, res, next) {
        try {
            const files = req.files
            files.forEach(async file => {
                const { filename, originalname, mimetype, size } = file;
                const qeury = {
                    id: Math.floor(Math.random() * 10),
                    name: filename,
                    url: `public/images/${filename}`,
                    size,
                    mimetype,
                    user_id: Math.floor(Math.random() * 10),
                }
                const result = await fileServer.create(qeury);
                console.log(result)
            })
        } catch  {
            next()
        }
    }

    async getImage(req, res, next) {
        try {
            const { id } = req.params;
            const result = await fileServer.qeuryImageInfo(id)
            console.log(result);
            res.send(200, {
                message: 'ok',
                data: result
            })
        } catch (err) {
            console.log(err.message)
            // next()
        }
    }

}

module.exports = new FileController();