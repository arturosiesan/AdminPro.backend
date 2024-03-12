const { Router } = require('express');
const expressFileUpload = require('express-fileupload');
const { validateJWT } = require('../middlewares/validate-jwt');

const { fileUpload, getImagen } = require('../controllers/uploads.controllers');

const router = Router();

router.use( expressFileUpload() );

router.put( '/:table/:id', validateJWT, fileUpload );
router.get( '/:table/:id', getImagen );


module.exports = router;