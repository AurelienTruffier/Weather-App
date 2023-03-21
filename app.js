const cityInput = document.querySelector("#newCityInput");
const submitBtn = document.querySelector("#submitBtn");
const logo = document.querySelector("#logo");

//couleurs du background dynamique
const nightColor = "rgb(25, 25, 118)";
const sunColor = "rgb(0,191,255)";
const cloudColor = "rgb(173,216,230)";
const rainColor = "rgb(147, 167, 173)";

let actualCity = '';

submitBtn.addEventListener('click', updateCity);

document.getElementById("cityDisplay").textContent= "Saisissez une ville";

function updateCity(){
    document.getElementById("cityDisplay").innerHTML = `Pour <span id="cityName">...</span>`;
    let newCity = cityInput.value;
    actualCity = newCity;
    let url = 'https://api.openweathermap.org/data/2.5/weather?q=' + actualCity + '&appid=APIKEY&units=metric';
    fetch(url).then(response => response.json()).then(data => {
        document.getElementById("cityName").textContent= data.name;
        document.getElementById("tempDisplay").textContent= `${data.main.temp} °C`;
        document.getElementById("humidityDisplay").textContent= `${data.main.humidity} % d'humidité`;
        //convertit les dates de timestamp vers un String
        let sunrise = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
        let sunset = new Date(data.sys.sunset * 1000).toLocaleTimeString();
        document.getElementById("sunriseDisplay").textContent= `🌄 ${sunrise}`;
        document.getElementById("sunsetDisplay").textContent= `🌇 ${sunset}`;
        //enlève toutes les classes de l'élément logo
        logo.classList.remove(...logo.classList);
        //selon la météo on change l'icône affiché et la couleur du background de l'app
        switch(data.weather[0].icon){
            case '01d':
                logo.classList.add("sun");
                document.body.style.backgroundColor = sunColor;
                break;
            case '01n':
                logo.classList.add("sun");
                document.body.style.backgroundColor = nightColor;
                break;
            case '02d':
                logo.classList.add("sun-cloud");
                document.body.style.backgroundColor = sunColor;
                break;
            case '02n':
                logo.classList.add("sun-cloud");
                document.body.style.backgroundColor = nightColor;
                break;
            case '03d':
                logo.classList.add("cloud");
                document.body.style.backgroundColor = sunColor;
                break;
            case '03n':
                logo.classList.add("cloud");
                document.body.style.backgroundColor = nightColor;
                break;
            case '04d':
                logo.classList.add("cloud");
                document.body.style.backgroundColor = cloudColor;
                break;
            case '04n':
                logo.classList.add("cloud");
                document.body.style.backgroundColor = nightColor;
                break;
            case '09d':
                logo.classList.add("rain");
                document.body.style.backgroundColor = rainColor;
                break;
            case '09n':
                logo.classList.add("rain");
                document.body.style.backgroundColor = nightColor;
                break;
            case '10d':
                logo.classList.add("rain");
                document.body.style.backgroundColor = rainColor;
                break;
            case '10n':
                logo.classList.add("rain");
                document.body.style.backgroundColor = nightColor;
                break;
            case '11d':
                logo.classList.add("storm");
                document.body.style.backgroundColor = rainColor;
                break;
            case '11n':
                logo.classList.add("storm");
                document.body.style.backgroundColor = nightColor;
                break;
            case '13d':
                logo.classList.add("snow");
                document.body.style.backgroundColor = rainColor;
                break;
            case '13n':
                logo.classList.add("snow");
                document.body.style.backgroundColor = nightColor;
                break;
            case '50d':
                logo.classList.add("mist");
                document.body.style.backgroundColor = rainColor;
                break;
            case '50n':
                logo.classList.add("mist");
                document.body.style.backgroundColor = nightColor;
                break;        
        }
    })
    //en cas d'erreur lors de l'exécution de la requête
    .catch(
        () => {
            document.getElementById("cityDisplay").innerHTML = `Une erreur est survenue, veuillez réessayer !`;
        }
    );
    //pour empêcher le formulaire d'envoyer des requêtes avec get et recharger la page
    event.preventDefault();
}