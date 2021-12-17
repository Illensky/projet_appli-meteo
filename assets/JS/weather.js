let longitude;
let latitude;

resultDiv = document.querySelector("#result")

function draw (targetDiv, weatherObject) {
    targetDiv.innerHTML = ""

    const cityP = document.createElement("p")
    cityP.id = "city"
    cityP.innerHTML = weatherObject.name
    const cityImg = document.createElement("img")
    cityImg.style.width = "30px"
    cityImg.style.padding = "3px"
    switch (weatherObject.weather[0].description) {
        case "ciel dégagé":
            cityImg.src = "http://openweathermap.org/img/wn/01d@2x.png"
            break;
        case "pluie":
        cityImg.src = "http://openweathermap.org/img/wn/10d@2x.png"
            break;
    }
    cityP.appendChild(cityImg);

    const humidityP = document.createElement("p")
    humidityP.id = "humidity"
    humidityP.innerHTML = "Humiditée : " +  "<br>" +weatherObject.main.humidity

    const pressureP = document.createElement("p")
    pressureP.id = "pressure"
    pressureP.innerHTML = "Pression : " + "<br>" + weatherObject.main.pressure + "<br>" + " hPa"

    const skyP = document.createElement("p")
    skyP.id = "sky"
    skyP.innerHTML = "Ciel : " + "<br>" + weatherObject.weather[0].description

    const windP = document.createElement("p")
    windP.id = "wind"
    const arrowP = document.createElement("p")
    arrowP.innerHTML = "&uarr;"
    arrowP.style.fontSize = "2rem"
    arrowP.style.transform = "rotate(" + Math.trunc(weatherObject.wind.deg).toString() + "deg)"
    windP.innerHTML = "Vitesse : " + "<br>" + Math.trunc(weatherObject.wind.speed *3.6).toString() + " Km/h" + "<br>" +
        "<br> Rafalles : " +  "<br>" + Math.trunc(weatherObject.wind.gust *3.6).toString() + " Km/h" + "<br>" +
        "<br> Direction : " + "<br>" + Math.trunc(weatherObject.wind.deg).toString() + " deg"
    windP.appendChild(arrowP)

    const tempP = document.createElement("p")
    tempP.id = "temp"
    tempP.innerHTML = "Température : " + "<br>" + Math.trunc(weatherObject.main.temp).toString() + " °C <br>" + "<br>" +
        "Ressenti : " + "<br>" + Math.trunc(weatherObject.main.feels_like).toString() + " °C"

    const sunHourP = document.createElement("p")
    sunHourP.id = "sunHour"
    const sunriseDate = new Date(weatherObject.sys.sunrise *1000);
    const sunsetDate = new Date(weatherObject.sys.sunset *1000)
    sunHourP.innerHTML = "Lever de soleil : " + "<br>" + sunriseDate.getHours().toString() + " h " + sunriseDate.getMinutes().toString() + "<br>"
    + "<br>Coucher de soleil : " + "<br>" + sunsetDate.getHours().toString() + " h " + sunsetDate.getMinutes().toString()

    const cityDiv = document.createElement("div")
    cityDiv.appendChild(cityP)
    cityDiv.id = "cityDiv"
    cityDiv.style.display = "flex"
    cityDiv.style.margin = "auto"
    targetDiv.appendChild(cityDiv)

    const firstInfo = document.createElement("div")
    firstInfo.id = "first"
    firstInfo.style.display = "flex"
    firstInfo.style.margin = "auto"
    firstInfo.appendChild(skyP)
    firstInfo.appendChild(tempP)
    targetDiv.appendChild(firstInfo)

    const secondInfo = document.createElement("div")
    secondInfo.id = "second"
    secondInfo.style.margin = "auto"
    secondInfo.style.display = "flex"
    secondInfo.appendChild(windP)
    secondInfo.appendChild(sunHourP)
    targetDiv.appendChild(secondInfo)

    const thirdInfo = document.createElement("div")
    thirdInfo.style.margin = "auto"
    thirdInfo.id = "third"
    thirdInfo.style.display = "flex"
    thirdInfo.appendChild(humidityP)
    thirdInfo.appendChild(pressureP)
    targetDiv.appendChild(thirdInfo)
}

const getWeatherByPosition = function (coordinates) {
    longitude = coordinates.coords.longitude.toFixed(1)
    latitude = coordinates.coords.latitude.toFixed(1)
    const url = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=473181a46534fcfe5e29dd70c34d4f8b&lang=fr&units=metric"
    getWeather(url)
}

function getWeather (requestURL) {
    fetch(requestURL)
        .then(response => response.json())
        .then(response => {
            draw(resultDiv, response)
            console.log(response)
        })
        .catch(() => resultDiv.innerHTML = "Veuillez rentrer une ville valide")
}

document.querySelector("#byPosition").addEventListener("click", () => {
    navigator.geolocation.getCurrentPosition(getWeatherByPosition);
})

document.querySelector("#byInput").addEventListener("click", () => {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + document.querySelector("#userCity").value + "&appid=473181a46534fcfe5e29dd70c34d4f8b&lang=fr&units=metric";
    getWeather(url)
})