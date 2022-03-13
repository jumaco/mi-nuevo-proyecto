const ADMIN = true;

const isAdmin = (req, res, next) => {
	if (ADMIN) {
		next();
	} else {
		res.status(401)
			.send({
				error: -1,
				descripcion: `ruta '${req.path}', método '${req.method}' no autorizada.`
			});
	}
};


module.exports = isAdmin