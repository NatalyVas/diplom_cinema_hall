function createTextChair(arrayChairs) {
	let textChairs = ``;
	for (let chair of arrayChairs) {
 		textChairs = textChairs + chair.row + `/` + chair.site + `, `;
 	}
	return textChairs.slice(0, -2)
}