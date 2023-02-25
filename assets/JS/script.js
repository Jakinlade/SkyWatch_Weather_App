// My Api key for openweather
const apiKey = "dc37ad7de363e9178459137f5c3b5f84"

// function to get current weather for the city i choose
function getCurrentWeather(city) {
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) { // handle successful response
    const city = response.name;
    const date = moment().format('dddd, MMMM Do, YYYY');
    const temp = response.main.temp;
    const humidity = response.main.humidity;
    const windSpeed = response.wind.speed;
    const iconCode = response.weather[0].icon;
    const iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;

    // update current weather section of HTML
    $('#today').empty();
    $('#today').append(`
      <div class="card">
        <div class="card-body">
          <h2>${city} (${date}) <img src="${iconURL}" alt="${response.weather[0].description}"></h2>
          <p>Temperature: ${temp} °C</p>
          <p>Humidity: ${humidity}%</p>
          <p>Wind Speed: ${windSpeed} m/s</p>
        </div>
      </div>
    `);

    // call function to get 5-day forecast for the same city
    getFiveDayForecast(city);
  }).catch(function(error) {
    // handle error
    console.log(error);
  });
}

// function to get 5-day forecast for a city
function getFiveDayForecast(city) {
  const queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    // handle successful response
    const forecasts = response.list.filter(forecast => forecast.dt_txt.includes('12:00:00')); // get only forecasts for noon
    $('#forecast').empty();
    for (let i = 0; i < forecasts.length; i++) {
      const date = moment(forecasts[i].dt_txt).format('MMM Do');
      const temp = forecasts[i].main.temp;
      const humidity = forecasts[i].main.humidity;
      const iconCode = forecasts[i].weather[0].icon;
      const iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;
      
      // add forecast to HTML
      $('#forecast').append(`
        <div class="col-sm">
          <div class="card text-white bg-primary">
            <div class="card-body">
              <h5>${date} <img src="${iconURL}" alt="${forecasts[i].weather[0].description}"></h5>
              <p>Temp: ${temp} °C</p>
              <p>Humidity: ${humidity}%</p>
            </div>
          </div>
        </div>
      `);
    }
  }).catch(function(error) {
    // handle error
    console.log(error);
  });
}

// function to handle search form submission
function handleSearchFormSubmit(event) {
  event.preventDefault();
  const searchTerm = $('#search-input').val();
  if (searchTerm) {
    // add the search term to search history
    addToSearchHistory(searchTerm);
    // get current weather for the city
    getCurrentWeather(searchTerm);
  }
}

// add an event listener to the search form
$('#search-form').on('submit', handleSearchFormSubmit);