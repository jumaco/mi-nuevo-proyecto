function getRoot(req, res) {
		res.send('Hi...!');
}


function getLogin(req, res) {
	if (req.isAuthenticated()) {
		let user = req.user;
		console.log('user logueado');
		res.json('login-ok', {
			usuario: user.username,
			nombre: user.firstName,
			apellido: user.lastName,
			email: user.email
		});
	}
	else {
		console.log('user NO logueado');
		res.json('User NO logueado');
	}
}


function getSignup(req, res) {
	res.json('Registrate! -> POST <- ');
}


function postLogin(req, res) {
	let user = req.user;
	res.send(`Bienvenido ${user.username}!!!`);
}


function postSignup(req, res) {
	let user = req.user;
	res.send(`Bienvenido! ${user.username}`);
}


function getFaillogin(req, res) {
	res.send('login-error');
}


function getFailsignup(req, res) {
	res.send('signup-error');
}


function getLogout(req, res) {
	req.logout();
	res.send('Logout!');
}


function failRoute(req, res) {
	res.status(404).send('FALLO routing-error');
}


module.exports = {
	getRoot,
	getLogin,
	postLogin,
	getFaillogin,
	getLogout,
	failRoute,
	getSignup,
	postSignup,
	getFailsignup
}