const apiKey = "64bfd227b4334146a99134623250111";
const baseUrl = "https://api.weatherapi.com/v1/forecast.json";

const locationInput = document.getElementById("locationInput");
const searchButton = document.getElementById("searchButton");
const cityDisplay = document.getElementById("city");
const tempDisplay = document.getElementById("temperature");

searchButton.addEventListener("click", () => {
    const location = locationInput.value.trim();
    if(location) {
        getWeather(location);
    }
});

locationInput.addEventListener("keypress", function(event) {
    if(event.key === "Enter"){
        searchButton.click();
    }
});

async function getWeather(location) {
    const url = `${baseUrl}?key=${apiKey}&q=${encodeURIComponent(location)}&days=1&aqi=yes`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if(data && data.location && data.forecast) {
            cityDisplay.textContent = `${data.location.name}, ${data.location.country}`;
            tempDisplay.textContent = 
                `   High temperature: ${data.forecast.forecastday[0].day.maxtemp_c}°C`;
        } else {
            cityDisplay.textContent = "Location not found";
            tempDisplay.textContent = "";
        }
    } catch (error) {
        cityDisplay.textContent = "Error fetching data";
        tempDisplay.textContent = "";
    }
}