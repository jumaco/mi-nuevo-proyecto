require('dotenv').config()

module.exports = {
	mongodb: {
		host: process.env.MONGO_DB_HOST,
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 5000
		}
	},
	mongoRemote: {
		client: process.env.MONGO_ATLAS_CLIENT,
		host: process.env.MONGO_ATLAS_HOST,
		options: {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			serverSelectionTimeoutMS: 5000
		}
	},
	file: {
		path: process.env.FILE_PATH
	},
	firebase: {
		"type": process.env.TYPE,
		"project_id": process.env.PROJECT_ID,
		"private_key_id": process.env.PRIVATE_KEY_ID,
		"private_key": process.env.PRIVATE_KEY,
		"client_email": process.env.CLIENT_EMAIL,
		"client_id": process.env.CLIENT_ID,
		"auth_uri": process.env.AUTH_URI,
		"token_uri": process.env.TOKEN_URI,
		"auth_provider_x509_cert_url": process.env.AUTH_PROVIDER_X509_CERT_URL,
		"client_x509_cert_url": process.env.CLIENT_X509_CERT_URL
	},
	sqlite3: {
		client: process.env.SQLITE_CLIENT,
		connection: {
			filename: process.env.SQLITE_FILENAME
		},
		useNullAsDefault: true
	},
	mariaDb: {
		client: 'mysql',
		connection: {
			host: process.env.MARIA_DB_HOST,
			port: process.env.MARIA_DB_PORT,
			user: process.env.MARIA_DB_USER,
			password: process.env.MARIA_DB_PASSWORD,
			database: process.env.MARIA_DB_DATABASE
		},
		pool: { min: 0, max: 7 }
	},
	NODE_ENV: process.env.NODE_ENV || 'development',
	HOST: process.env.HOST || 'localhost',
	PORT: process.env.PORT || 8080,
	STORAGE: process.env.STORAGE || 'file',
	MODE: process.env.MODE || 'FORK'
}