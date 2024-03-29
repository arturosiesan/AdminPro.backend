const express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config.database');

// Create express server
const app = express();

// Config CORS
app.use( cors() );

app.use( express.static('public') );

// Read and parse body
app.use( express.json() );

// Database
dbConnection();

// Routes
app.use( '/api/users', require('./routes/users.routes') );
app.use( '/api/login', require('./routes/auth.routes') );
app.use( '/api/hospitals', require('./routes/hospitals.routes') );
app.use( '/api/doctors', require('./routes/doctors.routes') );
app.use( '/api/search', require('./routes/searches.routes') );
app.use( '/api/upload', require('./routes/uploads.routes') );


app.listen( process.env.PORT, () => {
    console.log('Run server on port ' + process.env.PORT)
});