const express = require('express')
const { Router } = express


const {checkAuthentication} = require('../../middlewares/passportMiddle')

const router = new Router()

router.use('/:id', checkAuthentication, async (req, res) => {

	const isAuthenticated = req.isAuthenticated();

	const producto = await productosApi.getbyId(req.params.id);

	res.render("./product", {
		producto: producto,
		isAdmin: admin,
		isAuthenticated: isAuthenticated
	});

})

module.exports = router