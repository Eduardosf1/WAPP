function fetchWeather() {
    const city = document.getElementById('city-input').value;
    const apiKey = 'bab281d79e5f1e9755a68d754cc313e7'; // API-Schlüssel hier einfügen
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=de`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Netzwerkantwort war nicht ok');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
        })
        .catch(error => console.error('Fehler:', error));
}



function displayWeather(data) {
    var weatherOutput = document.getElementById('weather-output');
    var appMain = document.querySelector('.app-main'); 

    if (data && data.weather && data.main) {
        weatherOutput.innerHTML = `
            <h2>Wetter in ${data.name}</h2>
            <p>Temperatur: ${data.main.temp} °C</p>
            <p>Beschreibung: ${data.weather[0].description}</p>
            <p>Windstärke: ${data.wind.speed} m/s</p>
            <p>Luftdruck: ${data.main.pressure} hPa</p>
            <p>Feuchtigkeit: ${data.main.humidity} %</p>
            
        `;
        weatherOutput.style.display = 'block';

        
        var weatherBackgrounds = {
            clear: "url('Bilder/Klar.jpg')",
            clouds: "url('Bilder/Bewölkt.jpeg')",
            rain: "url('Bilder/Regen.jpg')",
            drizzle: "url('Bilder/Hagel.jpeg')",
            snow: "url('Bilder/Schnee.jpg')",
            thunderstorm: "url('Bilder/Blitz und Donner.jpg')",
            sun: "url('Bilder/Sonne.jpg')",
            mist: "url('Bilder/trub.jpg)",
            fog: "url('Bilder/trub.jpg)"
        };

        
        var weatherType = data.weather[0].main.toLowerCase();
        var backgroundImage = weatherBackgrounds[weatherType] || ""; 
       
        document.body.style.backgroundImage = backgroundImage;
        document.body.style.backgroundSize = "cover";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
    } else {
        weatherOutput.innerHTML = `<p>Stadt nicht gefunden.</p>`;
        weatherOutput.style.display = 'block';
        document.body.style.backgroundImage = "";
    }
}