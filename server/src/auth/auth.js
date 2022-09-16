const jwt = require('jsonwebtoken')

module.exports.auth = async function (req, res, next) {
    try {
        let token = req.headers['authorization']
        if (!token){
            return res.status(403).send({ status: false, msg: "Token is not present" })
        }
        let decodedToken = jwt.verify(token, process.env.Secret_key)
        req.userid = decodedToken.userId
        next()
    }
    
    catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}