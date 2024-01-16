const mongoose = require('mongoose');
const express = require('express');

const mongooseURI = 'mongodb://localhost:27017/inotebook?directConnection=true&readPreference=primary';
const connectToMongo = () => {
    mongoose.connect(mongooseURI).then(() => {
        console.log('Connected to MongoDB successfully.');

        const app = express();
        const port = 3100;

        app.use(express.json());
        // Available routes
        app.use('/api/auth', require('./routes/auth'));
        app.use('/api/notes', require('./routes/notes'));

        app.listen(port, () => {
            console.log(`Example app listening on port http://localhost:${port}/`);
        });

    }).catch((error) => {
        console.log('MongoDB conncetion error: ', error);
    });
}

module.exports = connectToMongo;