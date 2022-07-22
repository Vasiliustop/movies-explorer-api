require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const router = require('./routes/index');
const handleErrors = require('./middlewares/handleErrors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');

const { PORT = 3000 } = process.env;
mongoose.connect('mongodb://localhost:27017/moviesdb');
const app = express();

app.use(cors({ credentials: true, origin: '*' }));

app.use(bodyParser.json());

app.use(limiter);

app.use(helmet());

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);
app.use(errors());
app.use(handleErrors);

app.listen(PORT);
