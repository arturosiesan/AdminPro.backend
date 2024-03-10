const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user.models');
const { generateJWT } = require('../helpers/jwt');

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email });

        if( !userDB ) {
            return res.status(400).json({
                ok: false,
                message: "The email is not find"
            });
        }

        const validPassword = bcrypt.compareSync( password, userDB.password );
        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                message: "The password is not valid"
            });
        }

        const token = await generateJWT( userDB.id );

        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: "Unexpected error, check logs"
        })
    }

}

module.exports = {
    login,
}