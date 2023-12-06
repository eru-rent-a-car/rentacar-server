const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
// const fileUpload = require('express-fileupload');
require('dotenv').config();

const sequelize = require('./src/configs/database');
const initAssociations = require('./src/models/index');
const routes = require('./src/routes/index');

const app = express();
const PORT = process.env.PORT || 4000;

/** Middlewares */
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    optionsSuccessStatus: 200,
  })
);

/** Apply the rate limiting middleware to all requests */
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 10 minutes)
    handler: function (req, res, next) {
      return res.json({ error: { message: 'Too many requests, please try again later.' } });
    },
  })
);

/** Initalize Relations */
initAssociations();

app.get('/', (req, res) => {
  return res.send('Hello World!');
});

/** Routes */
routes(app);

sequelize.sync({ force: false }).then(() => {
  console.log('Database connected!');
  /** Server */
  app.listen(PORT, () => {
    console.log(`Server listening on port http://localhost:${PORT}`);
  });
});
