const { response } = require('express');

const Doctor = require('../models/doctor.model');
const Hospital = require('../models/hospital.model');

const getDoctors = async ( req, res = response ) => {

    try {
        const doctors = await Doctor.find()
                                    .populate('user', 'name, email img')
                                    .populate('hospital', 'name');

        res.json({
            ok: true,
            doctors
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Unexpected error, check logs"
        });
    }

}

const createDoctors = async ( req, res = response ) => {

    try {
        const hospitalId = req.body.hospital;
        const existHospital = await Hospital.findById(hospitalId);

        if ( !existHospital ) {
            return res.status(403).json({
                ok: false,
                message: "The Hospital is not valid"
            });
        }

        const uid = req.uid;
        const doctor = new Doctor({
            user: uid,
            ...req.body
        });

        const doctorDB = await doctor.save();
        
        res.json({
            ok: true,
            hospital: doctorDB
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Unexpected error, check logs"
        });
    }

}
const updateDoctors = ( req, res = response ) => {

    res.json({
        ok: true,
        message: 'updateDoctors'
    });

}
const deleteDoctors = ( req, res = response ) => {

    res.json({
        ok: true,
        message: 'deleteDoctors'
    });

}

module.exports = {
    getDoctors,
    createDoctors,
    updateDoctors,
    deleteDoctors
}