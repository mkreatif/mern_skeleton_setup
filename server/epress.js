import express from 'express';
/**
 * Body parsing middleware to handle the complexities of parsing streamable request objects,
 * so we can simplify browser-server communication by exchanging JSON in the request body:
 */
import bodyParser from 'body-parser';
/**
 * Cookie parsing middleware to parse and set cookies in request objects 
 */
import cookieParser from 'cookie-parser'
/**
 * Compression middleware that will attempt to compress response bodies 
 * for all requests that traverse through the middleware
 */
import compression from 'compression'
/**
 * A collection of middleware functions to help secure Express apps by setting various HTTP headers
 */
import helmet from "helmet";
/**
 * Middleware to enable CORS (Cross-origin resource sharing)
 */
import cors from "cors";


const app = express();

/**
 * configuration express here
 */

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cookieParser());
app.use(compression);
app.use(helmet());
app.use(cors());


export default app;