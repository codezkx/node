const finalTeam = (path, req, res) => {
    return {
        code: 200,
        message: "OK",
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
        success: true
    }
}

module.exports = finalTeam
