const main = Array.from(document.getElementsByTagName(`main`));
main[0].innerHTML = ``;

SendRequest(`POST`, `https://jscp-diplom.netoserver.ru/`, `event=update`, handlerDataMain);

const nav = Array.from(document.querySelector(`.page-nav`).querySelectorAll(`.page-nav__day`));
const chosen = document.querySelector(`.page-nav`).querySelector(`.page-nav__day_chosen`);
chosen.classList.remove(`page-nav__day_chosen`);
nav[0].classList.add(`page-nav__day_chosen`);

const weekend = Array.from(document.querySelector(`.page-nav`).querySelectorAll(`.page-nav__day_weekend`));
for (let w of weekend) {
	w.classList.remove(`page-nav__day_weekend`);
}

const now = new Date();
localStorage.setItem(`cinema`, JSON.stringify(now));

const options = {
	weekday: `short`,
	day: `numeric`,
}


for (let i = 0; i < nav.length; i++) { 
	let date = new Date(
		now.getFullYear(), 
		now.getMonth(),
		now.getDate() + i,
	);
	let dateForNav = {
		week: date.toLocaleDateString('ru-RU', options).slice(0, 2),
		day: date.toLocaleDateString('ru-RU', options).slice(4)
	}

	nav[i].querySelector(`.page-nav__day-week`).textContent = dateForNav.week;
	nav[i].querySelector(`.page-nav__day-number`).textContent = dateForNav.day;

	nav[i].dataset.timestamp = Date.parse(`${date.getFullYear()}.${date.getMonth()}.${date.getDate()} 00:00:00`)/1000; 

	if (dateForNav.week === `сб` || dateForNav.week === `вс`) {
		nav[i].classList.add(`page-nav__day_weekend`);
	}


	nav[i].addEventListener(`click`, () => {
		document.querySelector(`.page-nav`).querySelector(`.page-nav__day_chosen`).classList.remove(`page-nav__day_chosen`);
		nav[i].classList.add(`page-nav__day_chosen`);

		localStorage.setItem(`cinema`, JSON.stringify(date));

	});
}