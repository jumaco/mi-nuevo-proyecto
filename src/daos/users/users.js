// const ContenedorMongoDb = require("../../contenedores/ContenedorMongoDB")

// class UserDaoMongoDB extends ContenedorMongoDb {

// 	constructor() {
// 		super('Users', {
// 			username: String,
// 			password: String,
// 			name: String,
// 			address: String,
// 			age: String,
// 			phone: String,
// 			thumbnail: String
// 		})
// 	}
// }

// module.exports = UserDaoMongoDB


const mongoose = require('mongoose');

module.exports = mongoose.model('Users', {
	username: String,
	password: String,
	name: String,
	address: String,
	age: String,
	phone: String,
	thumbnail: String
});