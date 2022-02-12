/**
 * 
 * @param {number} min incluido
 * @param {number} max excludio
 * @returns {number} random number
 */
const getRandomInt = (min, max) => {
	return Math.floor(Math.random() * (max - min)) + min;
}

export default getRandomInt;