pushData();

const acceptinButton = document.querySelector(`.acceptin-button`);
let storage = JSON.parse(localStorage.getItem(`cinema`));
let arrayChairs = storage.chairs;

acceptinButton.addEventListener(`click`, () => {
	
let textForCoding = `Фильм: ${storage.title} Зал: Зал ${storage.numberHall} Ряд/Место: ${createTextChair(arrayChairs)} Дата: ${storage.date.day}-${storage.date.month}-${storage.date.year} Начало сеанса: ${storage.timeStart} Билет действителен строго на свой сеанс`;
	storage.QRcode = textForCoding;

	localStorage.setItem(`cinema`, JSON.stringify(storage));

	let link = document.createElement(`a`);
	link.href = `ticket.html`;
	link.click();
});
