const apiKey = "5242dd4684d876220d3c7bc48cec1cd2";

document.getElementById("searchButton").addEventListener("click", getWeather);

function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const box = document.getElementById("weatherBox");
  box.innerHTML = "";

  if (city === "") {
    box.innerHTML = "<p style='color:red;'>⚠️ Please enter a city name!</p>";
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("City not found!");
      return response.json();
    })
    .then(data => showFiveDays(data))
    .catch(error => {
      box.innerHTML = `<p style="color:red;">❌ ${error.message}</p>`;
    });
}

function showFiveDays(data) {
  const box = document.getElementById("weatherBox");
  const cityName = data.city.name;
  const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const today = new Date();
  let output = `<h2>${cityName}</h2>`;

  for (let i = 0; i < 5; i++) {
    const forecast = data.list[i * 8]; 
    if (!forecast) continue;

    const tempC = forecast.main.temp.toFixed(1);
    const tempF = (tempC * 9 / 5 + 32).toFixed(1);
    const tempK = (parseFloat(tempC) + 273.15).toFixed(1);
    const weather = forecast.weather[0].main;

    const dayIndex = (today.getDay() + i) % 7;
    const dayName = weekDays[dayIndex];

    output += `
      <div class="day-box">
        <h3>${dayName}</h3>
        <p>${getWeatherIcon(weather)} ${weather}</p>
        <p>🌡️ ${tempC}°C | ${tempF}°F | ${tempK}K</p>
      </div>
    `;
  }

  box.innerHTML = output;
}

function getWeatherIcon(condition) {
  switch (condition.toLowerCase()) {
    case "clear": return "☀️";
    case "clouds": return "☁️";
    case "rain": return "🌧️";
    case "snow": return "❄️";
    case "thunderstorm": return "⛈️";
    default: return "🌤️";
  }
}
