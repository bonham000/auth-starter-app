import express from 'express';
import path from 'path';
import fallback from 'express-history-api-fallback';
import devConfig from './config/setup/dev';
import prodConfig from './config/setup/prod';
import { NODE_ENV, PORT } from './config/env';

const app = express();

if (NODE_ENV === 'development') {
  devConfig(app);
} else {
  prodConfig(app);
}

app.use(express.static('dist/client'));
app.use(fallback(path.join(__dirname, '../../dist/client/index.html')));

app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Listening at port ${PORT} in ${NODE_ENV} mode`);
});

export default app;
