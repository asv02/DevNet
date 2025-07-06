const jwt = require('jsonwebtoken')
const User = require('../models/Users')


const auth = async (req, res, next) => {
    try {
        const { token } = req?.cookies;
        if (!token) {
            return res.status(401).send('InValid token!!')
        }
        const data = jwt.verify(token, 'akash@123');
        const userId = data._id;
        console.log("token->", token)
        const user = await User.findById(userId);
        if (!user) {
            throw new Error('User Not found!')
        }
        req.user = user;
        next();
    }
    catch (err) {
        res.status(500).send(`Can not validate credentials. ${err}`)
    }
}


module.exports = auth;