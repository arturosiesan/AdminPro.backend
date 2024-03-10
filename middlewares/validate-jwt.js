const jwt = require('jsonwebtoken');

const { response } = require('express');
const { validationResult } = require('express-validator');

const validateJWT = ( req, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            message: 'The token is required'
        });
    }

    try {
        
        const { uid } = jwt.verify( token, process.env.JWT_SECRET );

        req.uid = uid;
        
        next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            message: 'The token is invalid'
        });
    }
}

module.exports = {
    validateJWT,
}