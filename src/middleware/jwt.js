const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET;

function useAuth(req, res, next) {
    const signedkey = req.headers['x-access-token'];

    if (!signedkey) {
        return res.status(403).json({ error: 'access token not found' });
    }

    const user = jwt.decode(signedkey, SECRET)
    if (user) req.user = user.username;
    else {
        return res.status(403).json({ error: 'Invalid access token' });
    }
    next();
}

module.exports = useAuth;