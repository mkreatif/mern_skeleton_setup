import config from "./../config/config";
import app from './epress';

app.listen(config.port, (err) => {
    if (err) {
        console.error("ERROR TO START SERVER: ", err);
    }
    console.info('SERVER STARTED ON PORT %s.', config.port);
});