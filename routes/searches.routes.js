const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');

const { getSearch, getSearchCollection } = require('../controllers/searches.controllers');

const router = Router();

router.get( '/:itemSearch', validateJWT, getSearch );
router.get( '/collection/:table/:itemSearch', validateJWT, getSearchCollection );


module.exports = router;