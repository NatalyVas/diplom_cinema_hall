const dataAll = JSON.parse(localStorage.getItem(`cinema`));
document.querySelector(`.ticket__title`).textContent = dataAll[7];

let textChairs = ``;
for (let chair of dataAll[8]) {
 	textChairs = textChairs + chair.row + `/` + chair.site + `, `;
 }
let сhairs = textChairs.slice(0, -2);
document.querySelector(`.ticket__chairs`).textContent = сhairs;

document.querySelector(`.ticket__hall`).textContent = dataAll[2];
document.querySelector(`.ticket__start`).textContent = dataAll[6];

const acceptinButton = document.querySelector(`.acceptin-button`);

acceptinButton.addEventListener(`click`, () => {
	let textForCoding = `${dataAll[7]} ${dataAll[5]} ${сhairs}`;
	dataAll.push(textForCoding);
	localStorage.setItem(`cinema`, JSON.stringify(dataAll));

	window.setTimeout(() => {
		let link = document.createElement(`a`);
	 	link.href = `ticket.html`;
		link.click();
	 }, 100);	
});