/* Verb conjugator */

const axios = require('axios').default;
const JSDOM = require('jsdom').JSDOM;

const BASE_URL = 'https://cooljugator.com/fr/';
async function get(verb) {
	const url = encodeURI(BASE_URL + verb);
	const res = await axios.get(url);
	const { window } = new JSDOM(res.data);
	const $ = require('jquery')(window);
	return $('#present_perfect1 .meta-form').text();
}
module.exports.get = get;