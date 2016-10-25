import express from 'express';
import path from 'path';
import fallback from 'express-history-api-fallback';
import devConfig from './config/setup/dev';
import prodConfig from './config/setup/prod';
import { NODE_ENV, PORT } from './config/env';
import bodyParser from 'body-parser'

import userRoutes from './user-routes'

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

if (NODE_ENV === 'development') {
  devConfig(app);
} else {
  prodConfig(app);
}

app.use(express.static('dist/client'));
app.use(userRoutes);

app.use(fallback(path.join(__dirname, '../../dist/client/index.html')));

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`The Express Server is Listening at port ${PORT} in ${NODE_ENV} mode`);
});

export default app;
