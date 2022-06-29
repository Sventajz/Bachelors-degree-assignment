const mongoose = require('mongoose');
const express = require('express');
const app = express();
require('dotenv/config');


mongoose.connect(
    process.env.DB_CONNECTION,
    {useNewUrlParser:true},() =>
    {
        console.log("connected to db");
    }
);


app.listen(3000);