// My Api key for openweather
const apiKey = "1809f1f474be4472f90bfc7c78003195"

// function to get current weather for the city i choose
function getCurrentWeather(city) {
  const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {});
};
    // handle successful response

    // update current weather section of HTML

    // call function to get 5-day forecast for the same city

// function to get 5-day forecast for a city

    // handle successful response
      
      // add forecast to HTML
   
    // handle error

// function to handle form submit
