const mongoose = require('mongoose');

const dbConnection = async () => {

    try {
        await mongoose.connect(process.env.DB_CNN);

        console.log('Database online')
    } catch (error) {
        throw new Error("Error to start database")
    }

}

module.exports = {
    dbConnection
}