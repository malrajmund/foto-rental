const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
    //Pobranie tokenu z header
    const token = req.header('x-auth-token');

    //Sprawdzenie czy token istnieje
    if(!token){
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    //Weryfikacja tokenu
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    }   catch(err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }

}