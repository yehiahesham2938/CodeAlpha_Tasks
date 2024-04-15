// Declare variables
let city = "";
let cities = [];
const citiesDiv = document.getElementById("searched_cities_container");

init();

listClicker();
searchClicker();

// Function to initialize the application
function init() {
    const savedCities = JSON.parse(localStorage.getItem("cities"));
    if (savedCities !== null) {
        cities = savedCities;
    }
    renderButtons();
}

// Function to store cities in local storage
function storeCities() {
    localStorage.setItem("cities", JSON.stringify(cities));
}

// Function to render city buttons
function renderButtons() {
    citiesDiv.innerHTML = "";
    const uniqueCities = [...new Set(cities)];
    uniqueCities.forEach(cityName => {
        const buttonEl = document.createElement("button");
        buttonEl.textContent = cityName;
        buttonEl.setAttribute("class", "listbtn");
        citiesDiv.appendChild(buttonEl);
    });
}

// Function to handle click events on city buttons
function listClicker() {
    $(document).on("click", ".listbtn", function (event) {
        event.preventDefault();
        city = $(this).text().trim();
        APIcalls();
    });
}

// Function to handle click event on search button
function searchClicker() {
    $("#searchbtn").on("click", function (event) {
        event.preventDefault();
        city = $(this).prev().val().trim();
        cities.push(city);
        if (cities.length > 8) {
            cities.shift();
        }
        if (city === "") {
            return;
        }
        APIcalls();
        storeCities();
        renderButtons();
    });
}

// Function to make API calls
function APIcalls() {
    const url = "https://api.openweathermap.org/data/2.5/forecast?q=";
    const currenturl = "https://api.openweathermap.org/data/2.5/weather?q=";
    const APIkey = "&appid=5ce8439fd4264478d1da0b24a7cd547d";
    const queryurl = url + city + APIkey;
    const currentWeatherUrl = currenturl + city + APIkey;

    // Fetch five-day forecast
    $("#name_of_city").text("Today's Weather in " + city);
    $.ajax({
        url: queryurl,
        method: "GET",
    }).then(function (response) {
        let dayNumber = 0;
        response.list.forEach(item => {
            if (item.dt_txt.split(" ")[1] === "15:00:00") {
                const [year, month, day] = item.dt_txt.split("-").map(part => part.split(" ")[0]);
                $("#" + dayNumber + "date").text(`${month}/${day}/${year}`);
                const temp = Math.round(((item.main.temp - 273.15) * 9 / 5 + 32));
                $("#" + dayNumber + "five_day_temp").text(`Temp: ${temp}°F`);
                $("#" + dayNumber + "five_day_humidity").text(`Humidity: ${item.main.humidity}`);
                $("#" + dayNumber + "five_day_icon").attr("src", "http://openweathermap.org/img/w/" + item.weather[0].icon + ".png");
                dayNumber++;
            }
        });
    });

    // Fetch current weather
    $.ajax({
        url: currentWeatherUrl,
        method: "GET",
    }).then(function (currentData) {
        const temp = Math.round(((currentData.main.temp - 273.15) * 9 / 5 + 32));
        $("#today_temp").text(`Temperature: ${temp}°F`);
        $("#today_humidity").text(`Humidity: ${currentData.main.humidity}`);
        $("#today_wind_speed").text(`Wind Speed: ${currentData.wind.speed}`);
        $("#today_icon_div").attr({
            "src": "http://openweathermap.org/img/w/" + currentData.weather[0].icon + ".png",
            "height": "100px",
            "width": "100px"
        });
    });
}
