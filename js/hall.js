//console.log(JSON.parse(localStorage.getItem(`cinema`)));
const titleMovie = document.querySelector(`.buying__info-title`);
titleMovie.textContent = JSON.parse(localStorage.getItem(`cinema`))[7]; 
const timeMovie = document.querySelector(`.buying__info-start`);
timeMovie.textContent = `Начало сеанса: ${JSON.parse(localStorage.getItem(`cinema`))[6]}`

const number = JSON.parse(localStorage.getItem(`cinema`))[2];
const numberHall = document.querySelector(`.buying__info-hall`);
numberHall.textContent = `Зал ${number}`

let hall = JSON.parse(localStorage.getItem(`cinema`))[1];
const hallPlan = document.querySelector(`.conf-step__wrapper`);

if (JSON.parse(localStorage.getItem(`cinema`))[0].halls.result[number].hall_open === 0) {
	hallPlan.innerHTML = ``;
} else {
	hallPlan.innerHTML = hall;
}

const chairForСhoice = Array.from(document.querySelectorAll(`.conf-step__chair_standart, .conf-step__chair_vip`));
for (let chair of chairForСhoice) {
	let chairLebel;
		if (chair.classList.contains(`conf-step__chair_standart`)) {
			chairLebel = `standart`;
		} else {
		if (chair.classList.contains(`conf-step__chair_vip`)) {
				chairLebel = `vip`;				
			} 		
		}

	chair.addEventListener(`click`, () => {
 		chair.classList.remove(`conf-step__chair_${chairLebel}`);
 		chair.classList.toggle(`conf-step__chair_selected`);
		
 		if (!chair.classList.contains(`conf-step__chair_selected`)) {
 			chair.classList.add(`conf-step__chair_${chairLebel}`);
 		}
 	});
 }

const acceptinButton = document.querySelector(`.acceptin-button`);
const timestramp = JSON.parse(localStorage.getItem(`cinema`))[3];
const hall_id = JSON.parse(localStorage.getItem(`cinema`))[4];
const seance_id = JSON.parse(localStorage.getItem(`cinema`))[5];

acceptinButton.addEventListener(`click`, () => {
	const hallConfiguration = document.querySelector(`.conf-step__wrapper`);

	SendRequest(`POST`, `https://jscp-diplom.netoserver.ru/`, `event=sale_add&timestamp=${timestramp}&hallId=${hall_id}&seanceId=${seance_id}&hallConfiguration=${hallConfiguration}`, chairDetails);
	
	function chairDetails() {
		let selected = Array.from(document.querySelectorAll(`.conf-step__chair_selected`));
		let chairs = selected.slice(0, -1);
		let chairPlaces = [];

		for (let chair of chairs) {
			let chairPlace = {
				site: 0,
				row: 0,
			};
			let sites = Array.from(chair.closest(`.conf-step__row`).children);
			let index = sites.indexOf(chair);
			chairPlace.site = index + 1;

			let row = chair.closest(`.conf-step__row`);
			let rows = Array.from(row.closest(`.conf-step__wrapper`).children);
			let indexRow = rows.indexOf(row);
			chairPlace.row = indexRow + 1;

			chairPlaces.push(chairPlace);
		}
		let storage = JSON.parse(localStorage.getItem(`cinema`)).push(chairPlaces);
		//console.log(storage);
		localStorage.setItem(`cinema`, JSON.stringify(storage));
	}
});