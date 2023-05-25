pushData();

const acceptinButton = document.querySelector(`.acceptin-button`);

acceptinButton.addEventListener(`click`, () => {
	let storage = JSON.parse(localStorage.getItem(`cinema`));
	let textForCoding = `${storage.title} ${storage.seanceId} ${storage.сhairs}`;
	storage.QRcode = textForCoding;

	localStorage.setItem(`cinema`, JSON.stringify(storage));

	window.setTimeout(() => {
		let link = document.createElement(`a`);
	 	link.href = `ticket.html`;
		link.click();
	 }, 1000);	
});