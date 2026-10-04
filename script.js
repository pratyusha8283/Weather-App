// ========================================
// ATMOS WEATHER APP
// ========================================


// ========================================
// API KEY
// ========================================

// Replace this with your OpenWeatherMap API key

const API_KEY = "ee01e28317b86ea4d1ddd50c7c34b218";


// ========================================
// DOM ELEMENTS
// ========================================

const cityInput =
    document.getElementById("cityInput");

const searchBtn =
    document.getElementById("searchBtn");

const weatherCard =
    document.getElementById("weatherCard");

const welcomeCard =
    document.getElementById("welcomeCard");

const errorMessage =
    document.getElementById("errorMessage");

const cityName =
    document.getElementById("cityName");

const weatherCondition =
    document.getElementById("weatherCondition");

const weatherIcon =
    document.getElementById("weatherIcon");

const temperature =
    document.getElementById("temperature");

const humidity =
    document.getElementById("humidity");

const windSpeed =
    document.getElementById("windSpeed");

const feelsLike =
    document.getElementById("feelsLike");


// ========================================
// SEARCH BUTTON
// ========================================

searchBtn.addEventListener(
    "click",
    getWeather
);


// ========================================
// ENTER KEY SUPPORT
// ========================================

cityInput.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Enter") {

            getWeather();

        }

    }
);


// ========================================
// GET WEATHER
// ========================================

async function getWeather() {

    const city =
        cityInput.value.trim();


    // Clear previous error

    errorMessage.textContent = "";


    // Check empty input

    if (city === "") {

        errorMessage.textContent =
            "Please enter a city name.";

        cityInput.focus();

        return;

    }


    // Loading state

    searchBtn.innerHTML =
        "Loading...";


    searchBtn.disabled = true;


    try {

        // Fetch weather data

        const response = await fetch(

            `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`

        );


        // Convert response to JSON

        const data =
            await response.json();


        // Check API response

        if (!response.ok) {

            throw new Error(
                data.message ||
                "City not found"
            );

        }


        // Display weather

        displayWeather(data);


    }

    catch (error) {

        console.error(error);


        weatherCard.classList.add(
            "hidden"
        );


        welcomeCard.classList.remove(
            "hidden"
        );


        errorMessage.textContent = error.message;

    }


    finally {

        searchBtn.innerHTML = `
            Search
            <span>→</span>
        `;

        searchBtn.disabled = false;

    }

}


// ========================================
// DISPLAY WEATHER
// ========================================

function displayWeather(data) {


    // City and country

    cityName.textContent =
        `${data.name}, ${data.sys.country}`;


    // Weather condition

    weatherCondition.textContent =
        data.weather[0].description;


    // Temperature

    temperature.textContent =
        Math.round(data.main.temp);


    // Humidity

    humidity.textContent =
        `${data.main.humidity}%`;


    // Wind speed

    windSpeed.textContent =
        `${data.wind.speed} m/s`;


    // Feels like

    feelsLike.textContent =
        `${Math.round(data.main.feels_like)}°C`;


    // Weather icon

    weatherIcon.src =
        `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;


    weatherIcon.alt =
        data.weather[0].description;


    // Show weather card

    weatherCard.classList.remove(
        "hidden"
    );


    // Hide welcome card

    welcomeCard.classList.add(
        "hidden"
    );

}