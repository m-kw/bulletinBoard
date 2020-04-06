const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const formidable = require('express-formidable');
const shortid = require('shortid');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passport');
const userInViews = require('./config/userInViews');

const postsRoutes = require('./routes/posts.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

/* EXPRESS-SESSION CONFIG */
const sess = {
  secret: 'Custom Secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
};

if (app.get('env') === 'production') {
  sess.cookie.secure = true;
}

// Uncomment the line below if your application is behind a proxy (like on Heroku)
// or if you're encountering the error message:
// "Unable to verify authorization request state"
// app.set('trust proxy', 1);

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, '/public')));

app.use(session(sess));

app.use(passport.initialize());
app.use(passport.session());
app.use(userInViews());

app.use(formidable({ uploadDir: './public/uploads/' }, [{
  event: 'fileBegin', // on every file upload...
  action: (req, res, next, name, file) => {
    const fileName = shortid.generate() + '.' + file.name.split('.')[1];
    file.path = __dirname + '/public/uploads/photo_' + fileName;
  },
},
]));

/* API ENDPOINTS */
app.use('/api', postsRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* MONGOOSE */
mongoose.connect('mongodb://localhost:27017/bulletinBoard', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+ port);
});
