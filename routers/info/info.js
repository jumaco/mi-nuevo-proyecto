const express = require('express')
const { Router } = express

const router = new Router()

const numCPUs = require('os').cpus().length

const processargv = () => {
	let argv = []
	for (let j = 0; j < process.argv.length; j++) {
		argv.push(`${j - 1} => ${process.argv[j]}`)
	}
	return argv.splice(2)
}

router.get('/', (req, res) => {

	const { app } = req
	let args = app.get('args');
	const argumentos = { ...args.argv };

	argumentos.otros = argumentos._;
	delete argumentos._;
	delete argumentos.d;
	delete argumentos.m;
	delete argumentos.p;
	delete argumentos.s;

	let info = {
		date: new Date().toLocaleString(),
		arguments: processargv(),
		argumentsYargs: argumentos,
		folder: process.cwd(),
		plataform: process.platform,
		pid: process.pid,
		node: process.versions.node,
		title: process.title,
		path: process.execPath,
		memoria: `${process.memoryUsage().rss / 1024 / 1000} MB rss`,
		cpus: numCPUs
	}
	res.json(info)
})


export default router