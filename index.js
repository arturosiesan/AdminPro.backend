const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config.database');

// Create express server
const app = express();

// Config CORS
app.use( cors() );

// Read and parse body
app.use( express.json() );

// Database
dbConnection();

// Routes
app.use( '/api/users', require('./routes/users.routes') );
app.use( '/api/login', require('./routes/auth.routes') );


app.listen( process.env.PORT, () => {
    console.log('Run server on port ' + process.env.PORT)
});