function pushData() {
	const dataAll = JSON.parse(localStorage.getItem(`cinema`));
	document.querySelector(`.ticket__title`).textContent = dataAll.title;
	let array = dataAll.chairs;

	document.querySelector(`.ticket__chairs`).textContent = createTextChair(array);

	document.querySelector(`.ticket__hall`).textContent = dataAll.numberHall;
	document.querySelector(`.ticket__start`).textContent = dataAll.timeStart;
}