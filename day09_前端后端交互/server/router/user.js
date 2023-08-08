
const user = (req, res) => {
    return {
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
}

module.exports = user
