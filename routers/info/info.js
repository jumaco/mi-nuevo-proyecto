const express = require('express')
const { Router } = express

const router = new Router()

// const args = require('yargs/yargs')(process.argv.slice(2));

// args
// 	.default({
// 		modo: 'prod', puerto: 8080, debug: false
// 	})
// 	.alias({
// 		m: 'modo', d: 'debug', p: 'puerto', '_': 'otros'
// 	});

// const argumentos = { ...args.argv };

// argumentos.otros = argumentos._;
// delete argumentos._;
// delete argumentos.d;
// delete argumentos.m;
// delete argumentos.p;

// console.log(argumentos);

const processargv = () => {
	let argv = []
	for (let j = 0; j < process.argv.length; j++) {
		argv.push(`${j - 1} => ${process.argv[j]}`)
	}
	return argv.splice(2)
}

router.get('/', (req, res) => {
	let info = {
		arguments: processargv(),
		argumentsYargs: argumentos,
		folder: process.cwd(),
		plataform: process.platform,
		pid: process.pid,
		node: process.versions.node,
		title: process.title,
		path: process.execPath,
		memoria: `${process.memoryUsage().rss / 1024 / 1000} MB rss`
	}
	res.json(info)
})


export default router