const main = Array.from(document.getElementsByTagName(`main`));
main[0].innerHTML = ``;

SendRequest(`POST`, `https://jscp-diplom.netoserver.ru/`, `event=update`, handlerDataMain);

const nav = Array.from(document.querySelector(`.page-nav`).querySelectorAll(`.page-nav__day`));
const chosen = document.querySelector(`.page-nav`).querySelector(`.page-nav__day_chosen`);
chosen.classList.remove(`page-nav__day_chosen`);
nav[0].classList.add(`page-nav__day_chosen`);

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
		now.getHours(),
		now.getMinutes(),
		now.getSeconds(),
	);
	let dateForNav = {
		week: date.toLocaleDateString('ru-RU', options).slice(0, 2),
		day: date.toLocaleDateString('ru-RU', options).slice(4)
	}

	nav[i].querySelector(`.page-nav__day-week`).textContent = dateForNav.week;
	nav[i].querySelector(`.page-nav__day-number`).textContent = dateForNav.day;


	nav[i].addEventListener(`click`, () => {
		document.querySelector(`.page-nav`).querySelector(`.page-nav__day_chosen`).classList.remove(`page-nav__day_chosen`);
		nav[i].classList.add(`page-nav__day_chosen`);

		main[0].innerHTML = ``;

		SendRequest(`POST`, `https://jscp-diplom.netoserver.ru/`, `event=update`, handlerDataMain);

		localStorage.setItem(`cinema`, JSON.stringify(date));

	});
}