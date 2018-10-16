
const isAdmin = (req, res, next) => {

    if (req.user.role !== 'admin') {
        return res.status(401).json({ error: 'You must be an administrator to perform this operation'})
    }

    next()
}

module.exports = { isAdmin }