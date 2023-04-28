const main = Array.from(document.getElementsByTagName(`main`));
main[0].innerHTML = ``;

SendRequest(`POST`, `http://f0769682.xsph.ru/`, `event=update`, handlerDataMain);

function SendRequest(metod, path, arg, callback) {
	let request = new XMLHttpRequest();
	request.open(metod, path);
	request.setRequestHeader(`Content-type`, `application/x-www-form-urlencoded`);
	request.responseType = `json`;
	request.send(arg);
	request.addEventListener(`load`, () => callback(request));
}

function handlerDataMain(request) {
	let data = request.response;
	buildData(data);

	const seanceButtons = Array.from(document.querySelectorAll(`.movie-seances__time`));
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

	 		// 	let hallScheme = xhrHall.response;

	 		return false;
	 	});
	}
} 


function buildData(data) {
	for (let i = 0; i < data.films.result.length; i++) {
		let movie = document.createElement(`section`);
		movie.classList.add(`movie`);
		let movieInfo = document.createElement(`div`);
		movieInfo.classList.add(`movie__info`);
		movie.appendChild(movieInfo);

		let moviePoster = document.createElement(`div`);
		moviePoster.classList.add(`movie__poster`);
		let img = document.createElement(`img`);
		img.classList.add(`movie__poster-image`);
		img.alt = `${data.films.result[i].film_name} постер`;
		img.src = data.films.result[i].film_poster;
		moviePoster.appendChild(img);

		let movieDescription = document.createElement(`div`);
		movieDescription.classList.add(`movie__description`);
		let h2 = document.createElement(`h2`);
		h2.classList.add(`movie__title`);
		h2.textContent = data.films.result[i].film_name;
		movieDescription.appendChild(h2);
		let movieSynopsis = document.createElement(`p`);
		movieSynopsis.classList.add(`movie__synopsis`);
		movieSynopsis.textContent = data.films.result[i].film_description;
		movieDescription.appendChild(movieSynopsis);

		let movieData = document.createElement(`p`);
		movieData.classList.add(`movie__data`);
		let movieDataDuration = document.createElement(`span`);
		movieDataDuration.classList.add(`movie__data-duration`);
		movieDataDuration.textContent = data.films.result[i].film_duration + `мин.`
		movieData.appendChild(movieDataDuration);
		let movieDataOrigin = document.createElement(`span`);
		movieDataOrigin.classList.add(`movie__data-origin`);
		movieDataOrigin.textContent = data.films.result[i].film_origin;
		movieData.appendChild(movieDataOrigin);

		movieDescription.appendChild(movieData);
		movieInfo.appendChild(moviePoster);
		movieInfo.appendChild(movieDescription);

		/* построение массива сеансов данного фильма по залам */
		
		for (let j = 0; j < data.halls.result.length; j++) {
			data.halls.result[j].seance = [];
			for (let x = 0; x < data.seances.result.length; x++) {
				if (data.films.result[i].film_id === data.seances.result[x].seance_filmid && data.seances.result[x].seance_hallid === data.halls.result[j].hall_id) {
					data.halls.result[j].seance.push(data.seances.result[x]);
				}
			}
		}

		/* внедрение залов и сеансов */

		for (let j = 0; j < data.halls.result.length; j++) {
			if (data.halls.result[j].seance.length != 0) {
				let movieSeancesHall = document.createElement(`div`);
				movieSeancesHall.classList.add(`movie-seances__hall`);

				let movieSeancesHallTitle = document.createElement(`h3`);
				movieSeancesHallTitle.classList.add(`movie-seances__hall-title`);
				movieSeancesHallTitle.textContent = `Зал ` + data.halls.result[j].hall_name.slice(3);
				movieSeancesHall.appendChild(movieSeancesHallTitle);

				let movieSeancesList = document.createElement(`ul`);
				movieSeancesList.classList.add(`movie-seances__list`);
				movieSeancesHall.appendChild(movieSeancesList);

				for (let x = 0; x < data.halls.result[j].seance.length; x++) {
					let movieSeancesTimeBlock = document.createElement(`li`);
					movieSeancesTimeBlock.classList.add(`movie-seances__time-block`);
					let movieSeancesTime = document.createElement(`a`);
					movieSeancesTime.classList.add(`movie-seances__time`);
					movieSeancesTime.href = "hall.html";
					//movieSeancesTime.href = "";
					movieSeancesTime.textContent = data.halls.result[j].seance[x].seance_time;
					movieSeancesTimeBlock.appendChild(movieSeancesTime);

					movieSeancesList.appendChild(movieSeancesTimeBlock);
				}
				movie.appendChild(movieSeancesHall);
			}
		}
		main[0].appendChild(movie);
	}
}
