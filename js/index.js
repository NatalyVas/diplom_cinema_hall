//localStorage.clear();
const main = Array.from(document.getElementsByTagName(`main`));
main[0].innerHTML = ``;

SendRequest(`POST`, `https://jscp-diplom.tw1.ru/`, `event=update`, handlerDataMain);