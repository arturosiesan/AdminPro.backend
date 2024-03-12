const fs = require('fs')

const User = require('../models/user.models');
const Doctor = require('../models/doctor.model');
const Hospital = require('../models/hospital.model');

const imagenUpload = async ( table, id, fileName ) => {
    
    switch (table) {
        case 'doctors':
            const doctor = await Doctor.findById( id );
            if ( !doctor ) { return false; }

            if ( fs.existsSync(`./uploads/doctors/${ doctor.img }`) ) { fs.unlinkSync( `./uploads/doctors/${ doctor.img }` ); }

            doctor.img = fileName;
            await doctor.save();

            return true;

            break;

        case 'users':
            const user = await User.findById( id );
            if ( !user ) { return false; }

            if ( fs.existsSync(`./uploads/users/${ user.img }`) ) { fs.unlinkSync( `./uploads/users/${ user.img }` ); }

            user.img = fileName;
            await user.save();

            return true;
            break;

        case 'hospitals':
            const hospital = await Hospital.findById( id );
            if ( !hospital ) { return false; }

            if ( fs.existsSync(`./uploads/hospitals/${ hospital.img }`) ) { fs.unlinkSync( `./uploads/hospitals/${ hospital.img }` ); }

            hospital.img = fileName;
            await hospital.save();

            return true;
            
            break;
    }

}

module.exports = {
    imagenUpload,
}