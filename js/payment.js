const dataAll = JSON.parse(localStorage.getItem(`cinema`));
//console.log(dataAll);
const data = dataAll[0];
const seanceId = dataAll[5];

let seances = data.seances.result;
let index = seances.findIndex(el => el.seance_id === seanceId);
let titleId = seances[index].seance_filmid;
let titleIndex = data.films.result.findIndex(el => el.film_id === titleId);

let title = data.films.result[titleIndex].film_name;

let start = seances[index].seance_time;

const titleText = document.querySelector(`.ticket__title`);
titleText.textContent = title;

const ticketChairs = document.querySelector(`.ticket__chairs`);
let textChairs = ``;
for (let chair of dataAll[6]) {
	textChairs = textChairs + chair.row + `/` + chair.site + `, `;
}
сhairs = textChairs.slice(0, -2);
ticketChairs.textContent = сhairs;

const ticketHall = document.querySelector(`.ticket__hall`);
ticketHall.textContent = dataAll[2];

const ticketStart = document.querySelector(`.ticket__start`);
ticketStart.textContent = start;

dataAll.push(title);
dataAll.push(start);
localStorage.setItem(`cinema`, JSON.stringify(dataAll));