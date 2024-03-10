const { Router } = require('express');
const { login } = require('../controllers/auth.controllers');
const { check } = require('express-validator');
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

module.exports = router