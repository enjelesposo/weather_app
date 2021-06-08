const country = document.querySelector('.country');
const dayDisplay = document.querySelector('.day');
const timeDisplay = document.querySelector('.time');
const temperature = document.querySelector('.temperature');
const minTemp = document.querySelector('.min-temp');
const maxTemp = document.querySelector('.max-temp');
const weatherIcon = document.querySelector('.icon');
const description = document.querySelector('.description');

const days = ["Sunday", "Monday", "Tuesday", "Wednesay", "Thursday", "Friday", "Saturday"];

if("geolocation" in navigator) {
        
    // get latitude & longitude
    let lat;
    let lon;

    navigator.geolocation.getCurrentPosition( position => {
        lat = position.coords.latitude;
        lon = position.coords.longitude;

        console.log(lat, lon);

        const API_KEY = "935ef7d1921ec5f78ad8acecd9ab3d3a";
        const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`;

        // fetch API
        fetch(url).then(res => res.json()).then(data => {
            const {main, sys, weather} = data;
            console.log(main);
            console.log(sys);
            console.log(weather);

            let date = new Date();
            let day = date.getDay();
            let hour = date.getHours();
            let minute = date.getMinutes();

            console.log(hour,minute);

            country.innerText = sys.country;
            dayDisplay.innerText = days[day];
            timeDisplay.innerText =`${hour} : ${minute}`;
            temperature.innerText = `${convertToCelsius(main.temp)}°C`;
            minTemp.innerText = `${convertToCelsius(main.temp_min)}°C`;
            maxTemp.innerText = `${convertToCelsius(main.temp_max)}°C`;
            weatherIcon.src = `./icons/${weather[0].icon}.svg`;
            description.innerText = weather[0].main;
        })
    });

} else {
   console.log("Not Available");
}


function convertToCelsius(temp){
    return Math.round((temp - 273.15 )* 10) / 10;
}