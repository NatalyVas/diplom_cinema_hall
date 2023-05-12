	let data = JSON.parse(window.localStorage.sinema);

	const seanceButtons = Array.from(document.querySelectorAll(`.movie-seances__time`));
	console.log(seanceButtons);
	for (let button of seanceButtons) {
	 	button.addEventListener(`click`, () => {
	 		event.preventDefault();

	 		let timeSeances = data.seances.result.filter(item => item.seance_time === button.textContent);
	 		let numberHall = button.closest(`.movie-seances__hall`).querySelector(`.movie-seances__hall-title`).textContent.slice(4);

	 		timeSeances.find(item => {
	 			data.halls.result.find(el => el.hall_id === item.seance_hallid).hall_name.slice(3) === numberHall;
	 		});

			let day = document.querySelector(`.page-nav__day_chosen`).querySelector(`.page-nav__day-number`).textContent;
			let dateNow = new Date();
			let timestamp = Date.parse(`${dateNow.getFullYear()}-${dateNow.getMonth()}-${day} ${timeSeances[0].seance_time}`) / 1000;

			SendRequest(`POST`, `http://f0769682.xsph.ru/`, `event=get_hallConfig&timestamp=${timestamp}&hallId=${timeSeances[0].seance_hallid}&seanceId=${timeSeances[0].seance_id}`, handlerDataHall);

	 		function handlerDataHall(request) {
	 			let hallScheme = request.response;
	 			let dataAll = [];
	 			dataAll.push(data);
	 			dataAll.push(hallScheme);
	 			localStorage.setItem(`sinema`, JSON.stringify(dataAll));
	 			//console.log(dataAll);
	 		}

	 		return false;
	 	});
	}