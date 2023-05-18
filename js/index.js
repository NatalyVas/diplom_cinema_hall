//localStorage.clear();
const main = Array.from(document.getElementsByTagName(`main`));
main[0].innerHTML = ``;

SendRequest(`POST`, `https://jscp-diplom.netoserver.ru/`, `event=update`, handlerDataMain);