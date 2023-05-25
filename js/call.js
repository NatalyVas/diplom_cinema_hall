function call() {
	let link = document.createElement(`a`);
	const fake = document.querySelector(`.movie`);
	fake.appendChild(link);
	fake.style.display = `none`;
	link.href = `hall.html`;
	link.click();
}