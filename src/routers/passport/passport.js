const express = require('express')
const { Router } = express

const session = require('express-session')
const MongoStore = require('connect-mongo')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true }
const config = require('../../config.js')

const { passportMiddle, checkAuthentication } = require('../../middlewares/passportMiddle')
const routes = require('./routes')

const router = new Router()

router.use(session({
	store: MongoStore.create({
		mongoUrl: config.mongoRemote.host,
		mongoOptions: advancedOptions
	}),
	secret: 'shhhhhhhhhhhhhhhhhhhhh',
	resave: false,
	saveUninitialized: false,
	rolling: true,
	cookie: {
		maxAge: 300000
	}
}))

router.use(passportMiddle.initialize());
router.use(passportMiddle.session());

//INDEX
router.get('/', routes.getRoot);

//LOGIN
router.get('/login', routes.getLogin);
router.post('/login', passportMiddle.authenticate('login', { failureRedirect: '/faillogin' }), routes.postLogin);
router.get('/faillogin', routes.getFaillogin);

//SINGUP
router.get('/signup', routes.getSignup);
router.post('/signup', passportMiddle.authenticate('signup', { failureRedirect: '/failsignup' }), routes.postSignup);
router.get('/failsignup', routes.getFailsignup);

//LOGOUT
router.get('/logout', routes.getLogout);

router.get('/ruta-protegida', checkAuthentication, (req, res) => {
	const { user } = req;
	res.send('<h1>Ruta OK!</h1>');
});

// //FAIL ROUTE
// router.get('*', routes.failRoute);

module.exports = router