import { Router } from 'express'
import { fork } from 'child_process'

const DEFAULT_CANT = 100000000;

const router = new Router()

router.get('/health', (req, res) => {
	res.json({ date: new Date().toLocaleString() })
});

router.get('/', (req, res) => {
	const { cant = DEFAULT_CANT } = req.query;
	const computo = fork('./src/utils/countRandomNumbers.js')

	computo.on('message', msg => {
		if (msg == 'listo') {
			computo.send(cant);
		} else {
			res.send(msg);
		}
	});

});

export default router;