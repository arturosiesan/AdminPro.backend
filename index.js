const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config.database');

// Create express server
const app = express();

// Config CORS
app.use( cors() );

// Database
dbConnection();

//mean_user
//X38NCE6WDDKfANOv

// Routes
app.get( '/', (req, res) => {

    res.json({
        ok: true,
        message: "Hello World!"
    });

});

app.listen( process.env.PORT, () => {
    console.log('Run server on port ' + process.env.PORT)
});