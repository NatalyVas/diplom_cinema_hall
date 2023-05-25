const dataAll = JSON.parse(localStorage.getItem(`cinema`));
document.querySelector(`.ticket__title`).textContent = dataAll[7];

let textChairs = ``;
for (let chair of dataAll[8]) {
 	textChairs = textChairs + chair.row + `/` + chair.site + `, `;
 }
let сhairs = textChairs.slice(0, -2);
document.querySelector(`.ticket__chairs`).textContent = сhairs;

document.querySelector(`.ticket__hall`).textContent = dataAll[2];
document.querySelector(`.ticket__start`).textContent = dataAll[6];

document.getElementById('qrcode').append(QRCreator(dataAll[9]).result);
