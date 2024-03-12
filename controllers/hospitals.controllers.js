const { response } = require('express');
const Hospital = require('../models/hospital.model');

const getHospitals = async ( req, res = response ) => {

    try {
        const hospitals = await Hospital.find()
                                        .populate('user', 'name, email img');

        res.json({
            ok: true,
            hospitals
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Unexpected error, check logs"
        });
    }

}

const createHospitals = async ( req, res = response ) => {

    try {
        const uid = req.uid;
        const hospital = new Hospital({
            user: uid,
            ...req.body
        });

        const hospitalDB = await hospital.save();
        
        res.json({
            ok: true,
            hospital: hospitalDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Unexpected error, check logs"
        });
    }

}

const updateHospitals = ( req, res = response ) => {

    res.json({
        ok: true,
        message: 'updateHospitals'
    });

}
const deleteHospitals = ( req, res = response ) => {

    res.json({
        ok: true,
        message: 'deleteHospitals'
    });

}

module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
}