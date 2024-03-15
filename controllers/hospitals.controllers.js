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

const updateHospitals = async ( req, res = response ) => {
    
    const hospitalId = req.params.id;
    const uid = req.uid;

    try {
        
        const hospital = await Hospital.findById( hospitalId );

        if( !hospital ) {
            return res.status(400).json({
                ok: false,
                message: 'Hospital not found with id'
            })
        }

        const changeHospital = {
            user: uid,
            ...req.body
        }

        const updateHospital = await Hospital.findByIdAndUpdate( hospitalId, changeHospital, { new: true });


        res.json({
            ok: true,
            hospital: updateHospital
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Unexpected error, check logs"
        });
    }

}

const deleteHospitals = async ( req, res = response ) => {

    const hospitalId = req.params.id;

    try {
        
        const hospital = await Hospital.findById( hospitalId );

        if( !hospital ) {
            return res.status(400).json({
                ok: false,
                message: 'Hospital not found with id'
            })
        }

        await Hospital.findByIdAndDelete( hospitalId );

        res.json({
            ok: true,
            message: 'Hospital deleted'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Unexpected error, check logs"
        });
    }

}

module.exports = {
    getHospitals,
    createHospitals,
    updateHospitals,
    deleteHospitals
}