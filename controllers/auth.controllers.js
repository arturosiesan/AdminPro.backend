const { response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user.models');

const { generateJWT } = require('../helpers/jwt');
const { googelVerify } = require('../helpers/googleVerify');

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

const googleSignIn = async (req, res = response) => {

    try {
        const { email, name, picture } = await googelVerify( req.body.token );

        const userDB = await User.findOne({ email });
        let user

        if ( !userDB ) {
            user = new User({
                name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            user = userDB;
            user.google = true;
        }

        await user.save();

        const token = await generateJWT( user.id );


    
        res.json({
            ok: true,
            email, name, picture,
            token
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: "The Google token is invalid"
        })
    }

}

// const googleSignInAuto = async (req, res = response) => {

//     try {

//         console.log(req);
//         console.log(req.query.token);

//         const { email, name, picture } = await googelVerify( req.query.token );

//         const userDB = await User.findOne({ email });
//         let user

//         if ( !userDB ) {
//             user = new User({
//                 name,
//                 email,
//                 password: '@@@',
//                 img: picture,
//                 google: true
//             })
//         } else {
//             user = userDB;
//             user.google = true;
//         }

//         await user.save();

//         const token = await generateJWT( user.id );


    
//         res.json({
//             ok: true,
//             email, name, picture,
//             token
//         })
        
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({
//             ok: false,
//             message: "The Google token is invalid"
//         })
//     }

// }

module.exports = {
    login,
    googleSignIn,
    // googleSignInAuto
}