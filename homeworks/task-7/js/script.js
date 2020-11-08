// DOM Elements
const time = document.querySelector('.b-main__time'),
  date = document.querySelector('.b-main__date'),
  greeting = document.querySelector('.b-main__title-greeting'),
  name = document.querySelector('.b-main__title-name'),
  focus = document.querySelector('.b-main__focus'),
  blockquote = document.querySelector('.b-main__quote-text'),
  figcaption = document.querySelector('.b-main__quote-author'),
  changeBgBtn = document.querySelector('.b-main__btn'),
  changeQuoteBtn= document.querySelector('.b-main__quote-btn'),
  weatherIcon = document.querySelector(".b-weather__weather-icon"),
  temperature = document.querySelector(".b-weather__temperature"),
  weatherDescription = document.querySelector(".b-weather__weather-discription"),
  city = document.querySelector(".city"),
  windSpeed = document.querySelector(".b-weather__windSpeed"),
  humidity = document.querySelector(".b-weather__humidity"),
  weatherError = document.querySelector(".b-weather__weather-error"),
  img = document.createElement('img'),
  today = new Date(),
  imgArr = [];
  
let count = today.getHours(),

morningImg = [
  'assets/morning/01.jpg',
  'assets/morning/02.jpg',
  'assets/morning/03.jpg',
  'assets/morning/04.jpg',
  'assets/morning/05.jpg',
  'assets/morning/06.jpg',
  'assets/morning/07.jpg',
  'assets/morning/08.jpg',
  'assets/morning/09.jpg',
  'assets/morning/10.jpg',
  'assets/morning/11.jpg',
  'assets/morning/12.jpg',
  'assets/morning/13.jpg',
  'assets/morning/14.jpg',
  'assets/morning/15.jpg',
  'assets/morning/16.jpg',
  'assets/morning/17.jpg',
  'assets/morning/18.jpg',
  'assets/morning/19.jpg',
  'assets/morning/20.jpg'
];

dayImg = [
  'assets/day/01.jpg',
  'assets/day/02.jpg',
  'assets/day/03.jpg',
  'assets/day/04.jpg',
  'assets/day/05.jpg',
  'assets/day/06.jpg',
  'assets/day/07.jpg',
  'assets/day/08.jpg',
  'assets/day/09.jpg',
  'assets/day/10.jpg',
  'assets/day/11.jpg',
  'assets/day/12.jpg',
  'assets/day/13.jpg',
  'assets/day/14.jpg',
  'assets/day/15.jpg',
  'assets/day/16.jpg',
  'assets/day/17.jpg',
  'assets/day/18.jpg',
  'assets/day/19.jpg',
  'assets/day/20.jpg'
];

eveningImg = [
  'assets/evening/01.jpg',
  'assets/evening/02.jpg',
  'assets/evening/03.jpg',
  'assets/evening/04.jpg',
  'assets/evening/05.jpg',
  'assets/evening/06.jpg',
  'assets/evening/07.jpg',
  'assets/evening/08.jpg',
  'assets/evening/09.jpg',
  'assets/evening/10.jpg',
  'assets/evening/11.jpg',
  'assets/evening/12.jpg',
  'assets/evening/13.jpg',
  'assets/evening/14.jpg',
  'assets/evening/15.jpg',
  'assets/evening/16.jpg',
  'assets/evening/17.jpg',
  'assets/evening/18.jpg',
  'assets/evening/19.jpg',
  'assets/evening/20.jpg'
];

nightImg = [
  'assets/night/01.jpg',
  'assets/night/02.jpg',
  'assets/night/03.jpg',
  'assets/night/04.jpg',
  'assets/night/05.jpg',
  'assets/night/06.jpg',
  'assets/night/07.jpg',
  'assets/night/08.jpg',
  'assets/night/09.jpg',
  'assets/night/10.jpg',
  'assets/night/11.jpg',
  'assets/night/12.jpg',
  'assets/night/13.jpg',
  'assets/night/14.jpg',
  'assets/night/15.jpg',
  'assets/night/16.jpg',
  'assets/night/17.jpg',
  'assets/night/18.jpg',
  'assets/night/19.jpg',
  'assets/night/20.jpg'
];


function createImgArr() {
  nightImg.sort(() => Math.random() - 0.5);
  for (let i = 0; i < 6; i++) {
    imgArr.push(nightImg[i]);
  };
  morningImg.sort(() => Math.random() - 0.5);
  for (let i = 0; i < 6; i++) {
    imgArr.push(morningImg[i]);
  };
  dayImg.sort(() => Math.random() - 0.5);
  for (let i = 0; i < 6; i++) {
    imgArr.push(dayImg[i]);
  };
  eveningImg.sort(() => Math.random() - 0.5);
  for (let i = 0; i < 6; i++) {
    imgArr.push(eveningImg[i]);
  };
  
  return imgArr;
};

  // Show Time and Date
function showTime() {
  let today = new Date();
    options = { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'},
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds(),

  // Output Date 
  date.innerHTML = `${today.toLocaleDateString('EN', options)}`;

  // Output Time
  time.innerHTML = `${addZero(hour)}<span>:</span>${addZero(min)}<span>:</span>${addZero(sec)}`;

  if(min === 0 && sec === 0) {
    setBgGreet();
  } else if (hour === 0 && min === 0 && sec === 0) {
    createImgArr();
  }

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12 && hour >= 6) {
    setBg(hour);
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18 && hour >= 12) {
    // Afternoon
    setBg(hour);
    greeting.textContent = 'Good Afternoon, ';
  } else if (hour < 24 && hour >= 18 ) {
    // Evening
    setBg(hour);
    greeting.textContent = 'Good Evening, ';
  } else if(hour < 6 && hour >= 0) {
    setBg(hour);
    greeting.textContent = 'Good Night, ';
  };
}


function setBg(count) {
  img.src = imgArr[count];
  img.onload = () => {      
    document.body.style.backgroundImage = `url(${imgArr[count]})`;;
  }; 
}

function changeBg() {
  changeBgBtn.disabled = true;
  count = (count + 1) % imgArr.length;
  img.src = imgArr[count];
  img.onload = () => {      
    document.body.style.backgroundImage = `url(${imgArr[count]})`;;
  }; 
  setTimeout(()=>changeBgBtn.disabled = false, 1300);
}



// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

function clickName(e) {
  name.textContent = '';
}
  
// Set Name
function setName(e) { 
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if(name.textContent === '') {
        name.textContent = localStorage.getItem('name'); 
      } else if (name.textContent === '' && localStorage.getItem('name') === null) {
        name.textContent = '[Enter Name]';
      } else {
        localStorage.setItem('name', e.target.innerText);
        name.blur();
      }
    }
  } else {
    if (localStorage.getItem('name') === null) {
      name.textContent = '[Enter Name]';
    } else {
      name.textContent = localStorage.getItem('name');
    }
  };
};

// Get Focus
function getFocus() {
  if (localStorage.getItem('focus') === null) {
    focus.textContent = '[Enter Focus]';
  } else {
    focus.textContent = localStorage.getItem('focus');
  };
};

function clickFocus(e) {
  focus.textContent = '';
};

// Set Focus
function setFocus(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      if(focus.textContent === '') {
        focus.textContent = localStorage.getItem('focus'); 
      } else if (focus.textContent === '' && localStorage.getItem('focus') === null) {
        focus.textContent = '[Enter focus]';
      } else {
        localStorage.setItem('focus', e.target.innerText);
        focus.blur();
      }
    }
  } else {
    if (localStorage.getItem('focus') === null) {
      focus.textContent = '[Enter focus]';
    } else {
      focus.textContent = localStorage.getItem('focus');
    }
  };
};

function getQuote() {
  fetch('https://type.fit/api/quotes')
    .then(
      function(res) {
        return res.json();
      }
    )
    .then(
      function(res) {
        let countQuote = Math.floor(Math.random() * (res.length - 0 + 1)) + 0;

        blockquote.textContent =  res[countQuote].text;
        figcaption.textContent = res[countQuote].author;
      }
    )

    changeQuoteBtn.classList.toggle('rotate');
};

function clickCity(e) {
  city.textContent = '';
}

//getCity
function getCity() {
  if(localStorage.getItem('city') === null){
      city.textContent = '[Enter city]';
      
  } else {
      city.textContent = localStorage.getItem('city');
      getWeather();
  }
}

function setCity(e) {
      if(!e.target.classList.contains('city')){

        if (localStorage.getItem('city') === null) {
          city.textContent = '[Enter city]';
        } else {
          city.textContent = localStorage.getItem('city');
        }       
      }
    if(e.type === "keypress"){
      if (e.which == 13) {
        if(city.textContent && city.textContent.trim()){
          city.blur();
          getWeather();
          localStorage.setItem('city', city.textContent);
        }else {
          city.textContent = localStorage.getItem('city');
          city.blur();
          getWeather();
        }
      }
    }
}

function getWeather() {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city.textContent}&lang=en&appid=dde728ceaaf3efea07d30a2b7f4a00f3&units=metric`)
    .then(
      function(res) {
        return res.json();
      }
    )
    .then(
      function(res) {
        console.log(res);
        if (city.textContent == "") {
          localStorage.setItem("city", cityStorage);
          city.textContent = localStorage.getItem("city");
        }else if (res.cod !== 200) {
            weatherError.textContent = res.message;
            weatherDescription.textContent = '';
            humidity.textContent = '';
            windSpeed.textContent = '';
            temperature.textContent = '';
            weatherIcon.className = '';
        } else {
          weatherIcon.className = "weather-icon owf";
          weatherIcon.classList.add(`owf-${res.weather[0].id}`);
          temperature.textContent = `${Math.trunc(res.main.temp)}°C`;
          city.textContent = res.name;
          localStorage.setItem('city', res.name);
          weatherDescription.textContent = res.weather[0].description;
          humidity.textContent = `Humidity: ${res.main.humidity}%`;
          windSpeed.textContent = `Wind speed: ${res.wind.speed}m/s`;
          weatherError.textContent='';
      }
      }
    )
    .catch(
      function(error) {
        console.log(error);
        city.textContent = "[Enter city]";
        weatherIcon.className = "weather-icon owf";
        temperature.textContent = ``;
        weatherDescription.textContent = "";
        humidity.textContent = ``;
        windSpeed.textContent = ``;
      }
    )
}

// document.addEventListener('DOMContentLoaded', getWeather);
document.addEventListener('DOMContentLoaded', getQuote);
document.addEventListener('click', setCity);
city.addEventListener('click', clickCity);
city.addEventListener('keypress', setCity);
name.addEventListener('click', clickName);
name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
focus.addEventListener('keypress', setFocus);
focus.addEventListener('blur', setFocus);
focus.addEventListener('click', clickFocus);
changeBgBtn.addEventListener('click', changeBg);
changeQuoteBtn.addEventListener('click',getQuote);

// Run
createImgArr();
showTime();
setBgGreet();
getName();
getFocus();
getCity();
