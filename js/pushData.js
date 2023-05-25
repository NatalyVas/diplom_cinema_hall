function pushData() {
	const dataAll = JSON.parse(localStorage.getItem(`cinema`));
	document.querySelector(`.ticket__title`).textContent = dataAll.title;

	let textChairs = ``;
	for (let chair of dataAll.chairs) {
 		textChairs = textChairs + chair.row + `/` + chair.site + `, `;
 	}
	let сhairs = textChairs.slice(0, -2);
	document.querySelector(`.ticket__chairs`).textContent = сhairs;

	document.querySelector(`.ticket__hall`).textContent = dataAll.numberHall;
	document.querySelector(`.ticket__start`).textContent = dataAll.timeStart;
}