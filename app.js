const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

const sequelize = require('./src/configs/database');
const { initAssociations } = require('./src/models/index');

const authRoutes = require('./src/routes/auth.route');

const app = express();
const PORT = process.env.PORT || 3000;

/** Middlewares */
app.use(morgan('common'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:8080',
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
// initAssociations();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

/** Routes */
app.use('/auth', authRoutes);

sequelize.sync({ force: true }).then(() => {
  console.log('Database connected!');
  /** Server */
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
});
