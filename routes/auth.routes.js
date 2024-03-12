const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth.controllers');
const { validateInputs } = require('../middlewares/validate-inputs');

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

// router.post( '/google/automatic',
//     [
//         check('token', 'The Goolge token is required').not().isEmpty(),
//         validateInputs
//     ],
//     googleSignInAuto
// )

module.exports = router