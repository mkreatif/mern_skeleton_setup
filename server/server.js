import config from "./../config/config";
import app from './express';
import template from './../template';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;
mongoose.set('useUnifiedTopology', true);
mongoose.connect(config.mongoUri, { useNewUrlParser: true });

mongoose.connection.on('error', () => {
    throw new Error(`unable to connect to database : ${config.mongoUri}`)
});

app.get('/', (req, res) => {
    res.status(200).send(template());
})

app.listen(config.port, (err) => {
    if (err) {
        console.error("ERROR TO START SERVER: ", err);
    }
    console.info('SERVER STARTED ON PORT %s.', config.port);
});