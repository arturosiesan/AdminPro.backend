const User = require('../models/user.models');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res = response) => {

    const from = Number(req.query.from) || 0;
    const to = Number(req.query.to) || 5;
    
    const [ users, total ] = await Promise.all([
        User
            .find({}, 'name email role google img')
            .skip( from )
            .limit( to ),
        User.countDocuments()
    ]);

    res.json({
        ok: true,
        users,
        total
    });

}

const createUsers = async (req, res = response) => {

    const { email, password } = req.body;

    try {
        const existEmail = await User.findOne({ email });

        if( existEmail ) {
            return res.status(400).json({
                ok: false,
                message: "The email is already registered"
            })
        }

        const user = new User( req.body );

        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );

        await user.save();

        const token = await generateJWT( user.id );

        res.json({
            ok: true,
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Unexpected error, check logs"
        });
    }
}

const updateUsers = async (req, res = response) => {

    const uid = req.params.id

    try {

        const userDB = await User.findById( uid );

        if( !userDB ) {
            return res.status(404).json({
                ok: false,
                message: 'The user with that id does not exist'
            })
        }

        const { password, google, email, ...payload} = req.body;

        if( userDB.email !== email ) {

            const existEmail = await User.findOne({ email });
            if( existEmail ) {
                return res.status(400).json({
                    ok: false,
                    message: 'A user already exists with that email'
                })
            }
        }

        payload.email = email;
        const userUpdate = await User.findByIdAndUpdate( uid, payload, { new: true } );

        res.json({
            ok: true,
            user: userUpdate
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            message: "Unexpected error, check logs"
        })
    }
}

const deleteUsers = async (req, res = response) => {

    const uid = req.params.id

    try {

        const userDB = await User.findById( uid );

        if( !userDB ) {
            return res.status(404).json({
                ok: false,
                message: 'The user with that id does not exist'
            })
        }

        await User.findByIdAndDelete( uid );

        res.json({
            ok: true,
            message: 'User delete'
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
    getUsers,
    createUsers,
    updateUsers,
    deleteUsers,
}