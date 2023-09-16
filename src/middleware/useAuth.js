const jwt = require('jsonwebtoken');
const User = require('../models/auth/user');
const SECRET = process.env.SECRET;


function useAuth(req, res, next) {
    const signedkey = req.headers['x-access-token'];

    if (!signedkey) {
        return res.status(403).json({ error: 'user not found' });
    }

    const user = jwt.decode(signedkey, SECRET)
    if (user) {
        User.findOne({ username: user.username }, 'username name _id').then(u => {
            if (u) {

                req.user = u
                next()
            }
            else {
                return res.status(403).json({ error: 'user not found' });
            }
        }).catch(err => {
            return res.status(403).json({ error: err });
        })
    }
    else {
        return res.status(403).json({ error: 'Invalid access token' });
    }
}

module.exports = useAuth;