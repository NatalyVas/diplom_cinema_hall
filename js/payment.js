pushData();

const acceptinButton = document.querySelector(`.acceptin-button`);
let storage = JSON.parse(localStorage.getItem(`cinema`));
let arrayChairs = storage.chairs;

acceptinButton.addEventListener(`click`, () => {
	
	let textForCoding = `${storage.title} ${storage.seanceId} ${createTextChair(arrayChairs)}`;
	storage.QRcode = textForCoding;

	localStorage.setItem(`cinema`, JSON.stringify(storage));

	let link = document.createElement(`a`);
	link.href = `ticket.html`;
	link.click();
});