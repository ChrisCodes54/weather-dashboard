console.log("this is a weather dashboard");

const apiKey = "27e2200923ad0c5c9aa2b6ac6fcf074b";

//Global Variables that can be called back
var userform = $("#user-form");
var cityinput = $("#city");
var weathercontainer = $("#current-weather-container");
var citysearchinput = $("#city-search-term");
let searchBtn = $("#searchBtn");

searchBtn.on("click", function (event) {
  event.preventDefault();

  var citysearch = cityinput.val().trim();

  if (citysearch) {
    getCurrentWeather(citysearch);

    weathercontainer.text("");
    cityinput.val("");
  } else {
    alert("Please enter a city");
  }
});



function getCurrentWeather(citysearch) {
  console.log("we got called by the on click", citysearch);

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citysearch}&appid=${apiKey}&units=imperial`;

  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    let cardTitle = $("<h2 class='card-title>").text(data.name);
    let temp = $("<p class='card-text'>").text("Temperature: " + data.main.temp + " F");
    let humidity =$("<p class='card-text'>").text("Humidity: " + data.main.humidity);
    let wind =$("<p class='card-text'>").text("Wind Speed: " + data.wind.speed);

    let card = $("<div class='card'>")
    let cardHeader = $("<div class='card-header'>")
    let cardBody = $("<div class='card-body'>")

    cardHeader.append(cardTitle)
    cardBody.append(temp, humidity, wind)
    card.append(cardHeader, cardBody)

    weathercontainer.append(card)

    let coords = {
      lat: data.coord.lat,
      lon: data.coord.lon
    }

    fiveDayForecast(coords)
  } 
  )

  function fiveDayForecast(coords){

    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lon}&appid=${apiKey}&units=imperial`

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      console.log("FIVE DAY DATA",data)
      for(i = 0; i < 5; i++) {

        let weatherContainer = $("#weather-forecast-container")

      // let cardTitle = $("<h2 class='card-title>").text(data.name);
      let temp = $("<p class='card-text'>").text("Temperature: " + data.daily[i].temp.day + " F");
      let humidity =$("<p class='card-text'>").text("Humidity: " + data.daily[i].humidity);
      let wind =$("<p class='card-text'>").text("Wind Speed: " + data.daily[i].wind_speed);
    
      let card = $("<div class='card'>")
      let cardHeader = $("<div class='card-header'>")
      let cardBody = $("<div class='card-body'>")
    
      // cardHeader.append(cardTitle)
      cardBody.append(temp, humidity, wind)
      card.append(cardHeader, cardBody)
      weatherContainer.append(card);
      }

    })
    // let year = new Date(forecast.dt * 1000).getFullYear();




    // in this apiURL you will need to dynamically put in the coords for the call.
    // basically follow the getCurrentWeather for flow.
    // BUT! When getting into dynamically creating elements do it inside of a for loop because you need 5 days



  }
  
  
  
  
  
  
  
  
  
  
  
  
}

// fetch(apiUrl).then((response) => {
//     if (response.ok) {
//       console.log(response);
//       response.json().then(function (data) {
//         console.log(data);
//       });
//     } else {
//       alert("Error: " + response.statusText);
//     }
//   });



// var formsubmit = function(event) {
//     event.preventDefault();

//     var citysearch = cityinput.val().trim();

//     if (citysearch) {
//         getcityweather(citysearch);

//         weathercontainer.textContent = '';
//         cityinput.value = '';
//     } else {
//         alert('Please enter a city')
//     }

// };
