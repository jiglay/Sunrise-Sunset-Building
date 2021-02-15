// acender a janela individualmente com o click

function toggleJanela(event) {
    event.target.classList.toggle('apaga');
}

function luzJanela() {
    const switchLuz = document.querySelectorAll('.janela');

    switchLuz.forEach(janela => {
        janela.addEventListener('click', toggleJanela);
    });
}
luzJanela();


// acender globalmente as janelas

function toggleLuz() {
    const listaJanela = document.querySelectorAll('.janela');

    if(listaJanela[0].classList.contains('apaga')) {
        listaJanela.forEach(janela => {
            janela.classList.remove('apaga');
        });
        return;
    }

    listaJanela.forEach(janela => {
        janela.classList.add('apaga');
    });
}

function luzGlobal() {
    const btnLuz = document.querySelector('.btn');

    btnLuz.addEventListener('click', toggleLuz);
}
luzGlobal();


// verificar a localização

function erro() {
    console.error('Ocorreu um erro.');
}

function sucesso(data) {
const http = `https://api.sunrise-sunset.org/json?lat=${data.coords.latitude}&lng=${data.coords.longitude}`;

const json_obj = JSON.parse(get(http));
const sunrise = json_obj.results.sunrise;
const sunset = json_obj.results.sunset;
let hora = new Date();
hora = hora.getHours();

verificaHora(hora, sunrise, sunset);
}

function verificaHora(hora, sunrise, sunset) {
    const listaJanela = document.querySelectorAll('.janela');
    // hora = 10; 
    if(hora > sunrise[0] && hora < (+sunset[0] + 12)) {
        listaJanela.forEach(janela => {
            janela.classList.add('apaga');
        });
        return;
    }

    listaJanela.forEach(janela => {
        janela.classList.remove('apaga');
    });

    document.querySelector('body').classList.add('body-noite');
    document.querySelector('.predio').classList.add('predio-noite');
}

function get(http){
    const httpReq = new XMLHttpRequest();
    httpReq.open("GET", http, false);
    httpReq.send(null);
    return httpReq.responseText;          
}

function localizacao() {
    navigator.geolocation.getCurrentPosition(sucesso, erro);
}
localizacao();