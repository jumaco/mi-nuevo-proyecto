const passportMiddle = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
import bCrypt from 'bcrypt'

const User = require('../src/daos/users/users')

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
				email: req.body.email,
				firstName: req.body.firstName,
				lastName: req.body.lastName,
			}
			User.create(newUser, (err, userWithId) => {
				if (err) {
					console.log('Error in Saving user: ' + err);
					return done(err);
				}
				console.log(user)
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

export function checkAuthentication(req, res, next) {
	if(req.isAuthenticated()){
		next()
	}
	else{
		res.redirect('/login')
	}
}

export default passportMiddle;