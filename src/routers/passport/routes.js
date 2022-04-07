const { productosDao: productosApi } = require('../../daos/index.js')
const admin = false

async function getRoot(req, res) {
	const isAuthenticated = req.isAuthenticated();
	const productos = await productosApi.getAll();
	res.render("./pages", {
		productos: productos,
		hayProductos: productos.length,
		isAdmin: admin,
		isAuthenticated: isAuthenticated
	});
}


function getLogin(req, res) {
	if (req.isAuthenticated()) {
		res.redirect('/')
	}
	else {
		res.render('./pages/login', {
			isAdmin: admin,
			isAuthenticated: req.isAuthenticated()
		})
	}
}


function getSignup(req, res) {
	res.render('./pages/signup', {
		isAdmin: admin,
		isAuthenticated: req.isAuthenticated()
	})
}


function postLogin(req, res) {
	res.redirect('/')
	// console.log('RES', res.req.user)
}


function postSignup(req, res) {
	res.redirect("/");
}


function getFaillogin(req, res) {
	res.send('login-error');
}


function getFailsignup(req, res) {
	res.send('signup-error');
}


function getLogout(req, res) {
	req.logout();
	res.render('./pages/logout', {isAuthenticated: req.isAuthenticated()} );
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