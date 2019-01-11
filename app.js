const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const authController = require('./controllers/authController');
const mongoose = require('mongoose');
const config = require('./config.js');
const fileUpload = require('express-fileupload');
const expenseController = require('./controllers/expenseController');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(express.static(__dirname + '/public'));
app.use(express.static('uploads'));
app.use(cookieParser());

var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }

  next();
};
app.use(checkAuth);

mongoose.connect( config.mongoURL, { useNewUrlParser: true })
.catch(err =>{
    throw err;
})

/**
 * Configuring bodyparser.
 */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));


app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
app.use(fileUpload());

app.use('/', expenseController);
app.use('/api/auth', authController);


app.get('*', function (req, res) {
	res.send({
		message: 'This endpoint does not exist',
		error: 404,
	}, 404);
});

/**
 * Starting application on configured port.
 */
app.listen(config.port, () => {
	console.log(`Application is running on: ${config.port}`);
});

module.exports = app;
