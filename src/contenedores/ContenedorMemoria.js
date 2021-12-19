class ContenedorMemoria {

	constructor() {
		this.elementos = []
	}

	getById(id) {
		const elem = this.elementos.find(elem => elem.id == id)
		if (!elem) {
			return null
		} else {
			return elem
		}
	}

	getAll() {
		return [...this.elementos]
	}

	save(elem) {
		let newId
		if (this.elementos.length == 0) {
			newId = 1
		} else {
			newId = this.elementos[this.elementos.length - 1].id + 1
		}

		const newElem = { ...elem, id: newId }
		this.elementos.push(newElem)
		return newElem
	}

	updateById(elem) {
		const index = this.elementos.findIndex(p => p.id == elem.id)
		if (index == -1) {
			return null
		} else {
			this.elementos[index] = elem
			return elem
		}
	}

	deleteById(id) {
		const index = this.elementos.findIndex(elem => elem.id == id)
		if (index == -1) {
			return null
		} else {
			return this.elementos.splice(index, 1)
		}
	}

	deleteAll() {
		this.elementos = []
	}
}

export default ContenedorMemoria;
