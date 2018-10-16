const { User } = require('../models/User')

const authenticate = async (req, res, next) => {

    try {
        //get token from cookies
        const token = req.cookies.w_auth
        if(!token){
            return res.status(400).json({ err: 'Unauthorized!'})
        }
        
        User.findByToken(token, (err, user) => {
            if (err) throw err
            if (!user) {
                return res.status(400).json({ error: 'Unauthorized' })
            }

            //attach user and token to req
            req.user = user
            req.token = token
            next()
        })

    } catch (err) {
        next(err)
    }
}

module.exports = { authenticate }