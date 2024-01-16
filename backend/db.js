const mongoose = require('mongoose');
const express = require('express');

const mongooseURI = 'mongodb://localhost:27017/?directConnection=true&readPreference=primary';
const connectToMongo = () => {
    mongoose.connect(mongooseURI).then(() => {
        console.log('Connected to MongoDB successfully.');

        const app = express();
        const port = 3100;

        app.get('/', (req, res) => {
            res.send('Hello buddy!');
        });
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`);
        });

    }).catch((error) => {
        console.log('MongoDB conncetion error: ', error);
    });
}

module.exports = connectToMongo;