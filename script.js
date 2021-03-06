console.log("this is a weather dashboard");

const apiKey = "27e2200923ad0c5c9aa2b6ac6fcf074b";
let searchHistory = [];

//Global Variables that can be called back
var userform = $("#user-form");
var cityinput = $("#city");
var weathercontainer = $("#current-weather-container");
var citysearchinput = $("#city-search-term");
let searchBtn = $("#searchBtn");
let recentCityEl = $("#history");

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
  addToHistory(citysearch)
});

function addToHistory(citysearch){

  if(searchHistory.indexOf(citysearch) !== -1){
  return;
  }
  searchHistory.push(citysearch)
  localStorage.setItem('searchHistory', JSON.stringify(searchHistory))
  showCityButton();
}

function showCityButton(){
  $(".history").empty();

  for(let i = searchHistory.length -1; i>= 0; i--){
    let cityBtn = $("<button>")
    cityBtn.addClass("historyBtn btn")
    cityBtn.attr("data-search", searchHistory[i])
    cityBtn.text(searchHistory[i])
    $(".history").append(cityBtn)
  }
}

function getHistory(){

  let historyStorage = localStorage.getItem("searchHistory")
  if(historyStorage){
    searchHistory = JSON.parse(historyStorage)
  }
  showCityButton();
}

getHistory()

function searchHistoryClick(event){
  console.log("clicked")
  // if(!event.target.matches(".historyBtn")){
  //   return;
  // }

  // let btn = event.target;
  // let cityHistorySearch = btn.attr("data-search")
  // console.log("DATA-Search FROM CITY HISTORY BUTTON", cityHistorySearch)

}





function getCurrentWeather(citysearch) {
  console.log("we got called by the on click", citysearch);

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${citysearch}&appid=${apiKey}&units=imperial`;

  fetch(apiUrl)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    let cardTitle = $("<h2 class='card-title'>").text(data.name);

    let icon = data.weather[0].icon
    let imgTag = $("<img>")
    let imgSrc = 'https://openweathermap.org/img/w/' + icon + '.png';
    imgTag.attr("src", imgSrc);
    console.log(icon)
    let date = $("<p class= 'card-text'>").text(moment.unix(data.dt).format('dddd l'));   
    let temp = $("<p class='card-text'>").text("Temperature: " + data.main.temp + " F");
    let humidity =$("<p class='card-text'>").text("Humidity: " + data.main.humidity);
    let wind =$("<p class='card-text'>").text("Wind Speed: " + data.wind.speed);

    let card = $("<div class='card currentWeatherCard'>")
    let cardHeader = $("<div class='card-header'>")
    let cardBody = $("<div class='card-body'>")

    cardHeader.append(cardTitle)
    cardBody.append(imgTag, date, temp, humidity, wind)
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

      let uvIndex = data.current.uvi;
      let uvEl = $("<p class='card-text'>").text("UV Index: " + uvIndex)

      if(uvIndex < 3){
        uvEl.addClass("safe")
      } else if(uvIndex < 7){
        uvEl.addClass("moderate")
      } else if(uvIndex < 10){
        uvEl.addClass("high")
      } else {
        uvEl.addClass("danger")
      }

      $(".currentWeatherCard").append(uvEl)

      let weatherContainer = $("#weather-forecast-container")
      weatherContainer.empty();

      for(i = 1; i < 6; i++) {

      // let cardTitle = $("<h2 class='card-title>").text(data.name);
      // let date = moment.unix(data.daily[i].dt).format('dddd l');
      let icon = data.daily[i].weather[0].icon
      let imgTag = $("<img>")
      let imgSrc = 'https://openweathermap.org/img/w/' + icon + '.png';
          imgTag.attr("src", imgSrc);
      let date = $("<p class= 'card-text'>").text(moment.unix(data.daily[i].dt).format('dddd l'));     
      let temp = $("<p class='card-text'>").text("Temperature: " + data.daily[i].temp.day + " F");
      let humidity =$("<p class='card-text'>").text("Humidity: " + data.daily[i].humidity);
      let wind =$("<p class='card-text'>").text("Wind Speed: " + data.daily[i].wind_speed);
    
      let card = $("<div class='card'>")
      let cardHeader = $("<div class='card-header'>")
      let cardBody = $("<div class='card-body'>")
    
      // cardHeader.append(cardTitle)
      cardBody.append(imgTag, date, temp, humidity, wind)
      card.append(cardHeader, cardBody)
      weatherContainer.append(card);
      }

    })



    recentCityEl.on("click", searchHistoryClick)





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
