const jwt = require('jsonwebtoken')
const config = require('config')


module.exports = function(req, res, next) {
    const token = req.header('x-auth-token');
    

    //check for token
    if(!token){
        res.status(401).json({msg: 'no token authorization denied'})
    }


    try {

        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
        
    } catch (error) {
        res.status(401).json({msg:'invalid token'})
    }

}