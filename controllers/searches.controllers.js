const { response } = require('express');

const User = require('../models/user.models');
const Doctor = require('../models/doctor.model');
const Hospital = require('../models/hospital.model');

const getSearch = async (req, res = response) => {

    const itemSearch = req.params.itemSearch;
    const regex = new RegExp( itemSearch, 'i' );

    const [ users, doctors, hospitals] = await Promise.all([
        User.find({ name: regex }),
        Doctor.find({ name: regex }),
        Hospital.find({ name: regex }),
    ]);

    res.json({
        ok: true,
        users,
        doctors,
        hospitals
    });

}

const getSearchCollection = async (req, res = response) => {

    const table = req.params.table;
    const itemSearch = req.params.itemSearch;

    const regex = new RegExp( itemSearch, 'i' );

    let data;

    switch( table ) {
        case 'doctors':
            data = await Doctor.find({ name: regex })
                                .populate('user', 'name img')
                                .populate('hospital', 'name img');
        break;
        
        case 'hospitals':
            data = await Hospital.find({ name: regex })
                                .populate('user', 'name img');
        break;

        case 'users':
            data = await User.find({ name: regex });
            
        break;
        
        default:
            return res.status(400).json({
                ok: false,
                message: "The table must be doctors, hospitals or users"
            });
    }

    res.json({
        ok: true,
        result: data
    });

}

module.exports = {
    getSearch,
    getSearchCollection,
}