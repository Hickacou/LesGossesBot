/* Infinitive verbs list generator */

const fs = require('fs');
const axios = require('axios').default;
const JSDOM = require('jsdom').JSDOM;

const URL = 'https://cooljugator.com/fr/list/all';
(async function () {
	fs.writeFileSync('list.txt', '');
	console.log('Created list.txt');
	const res = await axios.get(URL);
	const rawHtml = res.data;
	console.log('Page loaded');
	const { window } = new JSDOM(rawHtml);
	console.log('DOM generated');
	const $ = require('jquery')(window);
	console.log('JQuery loaded');

	console.log('Initiating scraping');
	const verbs = $('.ui.segment.stacked li.item a ');
	const amount = verbs.length;
	console.log(`Verbs loaded: ${amount}`);
	const loaded = []; // Avoids duplicates
	verbs.each(function (i) {
		const val = $(this).text().replace('\'', '’'); // Cooljugator uses this kind of apostrophe in their URL
		if (loaded.includes(val))
			return;
		loaded.push(val);
		fs.appendFileSync('list.txt', `${val}\n`);
		console.log(`${val} loaded (${i + 1}/${amount})`);
	});
	console.log(`${amount - loaded.length} duplicates ignored`);
})();