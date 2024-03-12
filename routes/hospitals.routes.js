const { Router } = require('express');
const { check } = require('express-validator');
const { validateInputs } = require('../middlewares/validate-inputs');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getHospitals, createHospitals, updateHospitals, deleteHospitals } = require('../controllers/hospitals.controllers');

const router = Router();

router.get( '/', validateJWT, getHospitals );

router.post( '/',
    [
        validateJWT,
        check('name', 'The name is required').not().isEmpty(),
        validateInputs
    ],
    createHospitals 
);

router.put( '/:id',
    [],
    updateHospitals
);

router.delete( '/:id', validateJWT, deleteHospitals );


module.exports = router;