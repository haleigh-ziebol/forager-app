const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload')

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

require('dotenv').config();

const app = express();


// Route includes
const userRouter = require('./routes/user.router');
const observationRouter = require('./routes/observation.router');
const wikipediaRouter = require('./routes/wikipedia.router');
const plantsRouter = require('./routes/plants.router');
const searchRouter = require('./routes/search.router');
const userdataRouter = require('./routes/userdata.router');
const imageRouter = require('./routes/image.router');

//middleware //
//req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// file upload
app.use(fileUpload());
app.use(express.static('build'));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/observation', observationRouter);
app.use('/api/wikipedia', wikipediaRouter);
app.use('/api/plants', plantsRouter);
app.use('/api/search', searchRouter);
app.use('/api/userdata', userdataRouter);
app.use('/api/image', imageRouter);


// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
