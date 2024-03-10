const { Router } = require('express');
const { check } = require('express-validator');
const { validateInputs } = require('../middlewares/validate-inputs');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getUsers, createUsers, updateUsers, deleteUsers } = require('../controllers/users.controllers');

const router = Router();

router.get( '/', validateJWT, getUsers );

router.post( '/',
    [
        check('name', 'The name is required').not().isEmpty(),
        check('password', 'The password is required').not().isEmpty(),
        check('email', 'The email is required').isEmail(),
        validateInputs,
    ],
    createUsers 
);

router.put( '/:id',
    [
        validateJWT,
        check('name', 'The name is required').not().isEmpty(),
        check('password', 'The password is required').not().isEmpty(),
        check('rol', 'The rol is required').not().isEmpty(),
        validateInputs
    ],
    updateUsers
);

router.delete( '/:id', validateJWT, deleteUsers );


module.exports = router;