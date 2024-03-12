const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require('path');
const fs = require('fs');

const { imagenUpload } = require('../helpers/fileUpload');

const fileUpload = async (req, res = response) => {

    const table = req.params.table;
    const id = req.params.id;

    const validTable = ['hospitals', 'doctors', 'users'];

    if( !validTable.includes(table) ) {
        return res.status(400).json({
            ok: false,
            message: 'Must be a user, doctor or hospital'
        });
    }

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            message: 'No files were uploaded.'
        });
    }

    const file = req.files.imagen;

    const cutName = file.name.split('.');
    const extensionFile = cutName[ cutName.length - 1 ];

    const validExtension = ['png', 'jpg'];
    if( !validExtension.includes(extensionFile) ) {
        return res.status(400).json({
            ok: false,
            message: 'IS not a valid extension'
        });
    }

    const fileName = `${ uuidv4() }.${ extensionFile }`;

    const path = `./uploads/${ table }/${ fileName }`;

    file.mv( path, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({
                ok: false,
                message: 'Error to move the file'
            })
        }

        imagenUpload( table, id, fileName );

        res.json({
            ok: true,
            message: 'File uploaded successfully',
            fileName
        });
    });



}

const getImagen = async (req, res = response) => {

    const table = req.params.table;
    const id = req.params.id;

    const pathImg = path.join( __dirname, `../uploads/${table}/${id}` );

    if( !fs.existsSync(pathImg) ) {
        const pathImg = path.join( __dirname, `../uploads/no-image.jpg` );
        return res.sendFile( pathImg ) 
    }

    res.sendFile( pathImg );
}

module.exports = {
    fileUpload,
    getImagen
}