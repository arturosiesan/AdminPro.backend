const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn, renewToken } = require('../controllers/auth.controllers');
const { validateInputs } = require('../middlewares/validate-inputs');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post( '/',
    [
        check('email', 'The email is required').isEmail(),
        check('password', 'The password is required').not().isEmpty(),
        validateInputs
    ],
    login
)

router.post( '/google',
    [
        check('token', 'The Goolge token is required').not().isEmpty(),
        validateInputs
    ],
    googleSignIn
)

router.get( '/renew', validateJWT, renewToken)

// router.post( '/google/automatic',
//     [
//         check('token', 'The Goolge token is required').not().isEmpty(),
//         validateInputs
//     ],
//     googleSignInAuto
// )

module.exports = router