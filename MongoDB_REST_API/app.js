const mongoose = require('mongoose');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require('dotenv/config');


app.use(bodyParser.json());

const garageRoutes = require('./routes/garage');
app.use('/garage',garageRoutes);

mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser:true},() =>
    {
        console.log("connected to db");
    }
);


app.listen(3000);