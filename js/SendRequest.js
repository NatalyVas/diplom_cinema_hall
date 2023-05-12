function SendRequest(metod, path, arg, callback) {
	let request = new XMLHttpRequest();
	request.open(metod, path);
	request.setRequestHeader(`Content-type`, `application/x-www-form-urlencoded`);
	request.responseType = `json`;
	request.send(arg);
	request.addEventListener(`load`, () => callback(request));
}