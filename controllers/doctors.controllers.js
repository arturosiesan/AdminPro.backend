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
        const doctorId = req.body.hospital;
        const existHospital = await Hospital.findById(doctorId);

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
const updateDoctors = async ( req, res = response ) => {

    const doctorId = req.params.id;
    const uid = req.uid;

    try {
        
        const doctor = await Doctor.findById( doctorId );

        if( !doctor ) {
            return res.status(400).json({
                ok: false,
                message: 'Doctor not found with id'
            })
        }

        const changeDoctor = {
            user: uid,
            ...req.body
        }

        const updateDoctor = await Doctor.findByIdAndUpdate( doctorId, changeDoctor, { new: true });


        res.json({
            ok: true,
            doctor: updateDoctor
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Unexpected error, check logs"
        });
    }

}
const deleteDoctors = async ( req, res = response ) => {

    const doctorId = req.params.id;

    try {
        
        const doctor = await Doctor.findById( doctorId );

        if( !doctor ) {
            return res.status(400).json({
                ok: false,
                message: 'Doctor not found with id'
            })
        }

        await Doctor.findByIdAndDelete( doctorId );

        res.json({
            ok: true,
            message: 'Doctor deleted'
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
    getDoctors,
    createDoctors,
    updateDoctors,
    deleteDoctors
}