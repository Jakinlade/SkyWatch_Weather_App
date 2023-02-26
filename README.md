# Weather_App

### Code repository:
https://github.com/Jakinlade/SkyWatch_Weather_App

### Deployed application:
https://jakinlade.github.io/SkyWatch_Weather_App

## Description
This Weather Dashboard is a web app that displays current weather and five-day forecast data for a location, using OpenWeatherMap API. It features a search input for users to specify a city and view the corresponding weather information. The app also includes a search history for user convenience.

## Code example
I used an Ajax call to grab the relevant data from the OpenWeatherMap API, then stored them into variables to display.


```js
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    const forecasts = response.list.filter(forecast => forecast.dt_txt.includes('12:00:00')); 
    $('#forecast').empty();
    for (let i = 0; i < forecasts.length; i++) {
      const date = moment(forecasts[i].dt_txt).format('MMM Do');
      const temp = forecasts[i].main.temp;
      const humidity = forecasts[i].main.humidity;
      const iconCode = forecasts[i].weather[0].icon;
      const iconURL = `https://openweathermap.org/img/w/${iconCode}.png`;
```

## Technologies used

![JavaScript Badge](https://img.shields.io/badge/Language-JavaScript-yellow)
<br>
![HTML Badge](https://img.shields.io/badge/Language-HTML-red)
<br>
![CSS badge](https://img.shields.io/badge/Language-CSS-blue)
<br>
![Bootstrap badge](https://img.shields.io/badge/Framework-Bootstrap-purple)

## License
### MIT License

Copyright (c) 2023

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
