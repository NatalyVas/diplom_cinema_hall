pushData();

document.getElementById('qrcode').append(QRCreator(JSON.parse(localStorage.getItem(`cinema`)).QRcode, {modsize: 2}).result);
