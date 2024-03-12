const { Router } = require('express');
const { check } = require('express-validator');
const { validateInputs } = require('../middlewares/validate-inputs');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getDoctors, createDoctors, updateDoctors, deleteDoctors } = require('../controllers/doctors.controllers');

const router = Router();

router.get( '/', validateJWT, getDoctors );

router.post( '/',
    [
        validateJWT,
        check('name', 'The name is required').not().isEmpty(),
        check('hospital', 'The hospital id is not valid').isMongoId(),
        validateInputs
    ],
    createDoctors 
);

router.put( '/:id',
    [],
    updateDoctors
);

router.delete( '/:id', validateJWT, deleteDoctors );


module.exports = router;