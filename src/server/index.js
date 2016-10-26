import express from 'express'
import assert from 'assert'
import path from 'path'
import fallback from 'express-history-api-fallback'
import devConfig from './config/setup/dev'
import prodConfig from './config/setup/prod'
import { NODE_ENV, PORT } from './config/env'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'

dotenv.config();
const url = process.env.MONGO_HOST;
//const url = 'mongodb://mongo:mongo@ds057816.mlab.com:57816/fcc-voting-app'

import mongodb from 'mongodb'
const MongoClient = mongodb.MongoClient;

import authRoutes from './routes/auth-routes'
import apiRoutes from './routes/api-routes'

const app = express();

MongoClient.connect(url, (err, db) => {
	
	assert.equal(null, err);
	console.log('Connection to MongoDB Established');

	db.close();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (NODE_ENV === 'development') {
  devConfig(app);
} else {
  prodConfig(app);
}

app.use(express.static('dist/client'));

// connect authentication routes
app.use(authRoutes);

app.use(fallback(path.join(__dirname, '../../dist/client/index.html')));

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`The Express Server is Listening at port ${PORT} in ${NODE_ENV} mode`);
});

export default app;
