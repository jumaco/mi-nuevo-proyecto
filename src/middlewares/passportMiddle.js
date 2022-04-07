const passportMiddle = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bCrypt = require('bcrypt')

const User = require('../daos/users/users')

//CONFIGURAR LOCALSTRATEGY DE LOGIN

function isValidPassword(user, password) {
	return bCrypt.compareSync(password, user.password);
}

passportMiddle.use('login', new LocalStrategy(
	(username, password, done) => {
		User.findOne({ username }, (err, user) => {
			if (err)
				return done(err);

			if (!user) {
				console.log('User Not Found with username ' + username);
				return done(null, false);
			}

			if (!isValidPassword(user, password)) {
				console.log('Invalid Password');
				return done(null, false);
			}

			return done(null, user);
		});
	})
);

//CONFIGURAR LOCALSTRATEGY DE SIGNUP

function createHash(password) {
	return bCrypt.hashSync(
		password,
		bCrypt.genSaltSync(10),
		null);
}

passportMiddle.use('signup', new LocalStrategy({
	passReqToCallback: true
},
	(req, username, password, done) => {
		User.findOne({ 'username': username }, function (err, user) {

			if (err) {
				console.log('Error in SignUp: ' + err);
				return done(err);
			}

			if (user) {
				console.log('User already exists');
				return done(null, false)
			}

			const newUser = {
				username: username,
				password: createHash(password),
				name: req.body.nameLastname,
				address: req.body.address,
				age: req.body.age,
				phone: req.body.phone,
				thumbnail: req.body.thumbnail
			}
			User.create(newUser, (err, userWithId) => {
				if (err) {
					console.log('Error in Saving user: ' + err);
					return done(err);
				}
				console.log('User Registration succesful');
				return done(null, userWithId);
			});
		});
	})
)

//SERIALIZAR Y DESERIALIZAR (restaurar el estado de autenticación)
//utiliza el id del usuario 
passportMiddle.serializeUser((user, done) => {
	done(null, user._id);
});
//utiliza el objeto de usuario
passportMiddle.deserializeUser((id, done) => {
	User.findById(id, done);
});

function checkAuthentication(req, res, next) {
	if (req.isAuthenticated()) {
		next()
	}
	else {
		res.redirect('/login')
	}
}

module.exports = { passportMiddle, checkAuthentication }