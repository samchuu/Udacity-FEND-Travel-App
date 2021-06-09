async function getGeoNames(input) {
    const geoUser = process.env.GEO_API_KEY;
    //make request to url
    const response = await fetch(`http://api.geonames.org/searchJSON?q=${input}&maxRows=1&username=${geoUser}`);
    const data = await response.json();
    return data
  }

async function getWeatherBit(name, lat, lng) {
  const wbUser = process.env.WEATHERBIT_KEY;
  //make request to url
  const response = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${wbUser}`);
  const data = await response.json();
  const weatherInfo = {
    temp: data.data[0].temp,
    description: data.data[0].weather.description,
    countryCode: data.data[0].country_code 
  } 
  const startDate = document.getElementById("start");
  const endDate = document.getElementById("end");
  const startDateValue=startDate.value;
  const endDateValue=endDate.value;
  
  let today = new Date();
  let date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
  
  //how to get number of days between two date objects 
  //https://www.youtube.com/watch?v=D0KP8y-vctg&ab_channel=KodeBase
  let departureDate = new Date(startDateValue);
  let returnDate = new Date(endDateValue);
  let todayDate = new Date(date)
  let tripLength = returnDate.getTime() - departureDate.getTime();
  
  let millisecsInDayFormula= 1000 *3600 *24;
  
  let daysAway= departureDate.getTime()- todayDate.getTime();
  let flooredDaysAway= Math.floor(daysAway/millisecsInDayFormula);

  //trip details
  const container = document.querySelector(".box");
  const inputName=name;
  const finalName=inputName.charAt(0).toUpperCase()+inputName.slice(1);
  container.innerHTML = `
  <div class="trip__details"> 
  <h3>Trip Details</h3>
  <p>🗺️  Trip to: ${finalName}, ${weatherInfo.countryCode}</p>
  <p>🛫 Departure: ${startDate.value}</p>
  <p>🛬  Return: ${endDate.value}</p>
  <p>📆  Trip length: ${tripLength/millisecsInDayFormula} days</p>
  <p>❄️ Temperature: ${weatherInfo.temp}°C</p>
  <p>☁️  Description: ${weatherInfo.description}</p>

  <div>

  <button class="save__trip">Save Trip</button>
 

  </div>

  </div>

  `

  const saveTrip=document.querySelector(".save__trip");
  saveTrip.addEventListener("click", ()=>{
  
    container.innerHTML = `
    <h2 class="trip__away">Your trip to ${finalName} is ${flooredDaysAway} days away! ⏳</h2>
  <div class="trip__details"> 
  <h3>Trip Details</h3>

  <p>🗺️  Trip to: ${finalName}, ${weatherInfo.countryCode}</p>
  <p>🛫 Departure: ${startDate.value}</p>
  <p>🛬  Return: ${endDate.value}</p>
  <p>📆  Trip length: ${tripLength/millisecsInDayFormula} days</p>
  <p>❄️ Temperature: ${weatherInfo.temp}°C</p>
  <p>☁️  Description: ${weatherInfo.description}</p>

  <div>

  <button class="close__trip">Remove Trip</button>
  <button class="save__trip">Save Trip</button>
 
  </div>

  </div>

  `
  const closeTrip = document.querySelector(".close__trip");
  const tripContainer = document.querySelector(".container")
  closeTrip.addEventListener("click", ()=>{
    tripContainer.style.display="none";
    travelDetails.style.display="block";
  })

  
  })
  return weatherInfo;
};

async function getPixabay(input) {
  
  const pixabayAPI = process.env.PIX_API_KEY;
  //make request to url
  const response = await fetch(`https://pixabay.com/api/?key=${pixabayAPI}&q=${input}&image_type=photo`);
  const data = await response.json();
  const photo = document.querySelector(".photo")
  photo.innerHTML=` <img src="${data.hits[1].webformatURL}" alt="" class="pixabay_photo">`;

  return data

}

const search = document.getElementById("zip");
const button = document.getElementById("generate");
const travelDetails=document.querySelector(".travel__details");
button.addEventListener("click", () => {
  const currentVal = search.value;
  // console.log(getGeoNames(currentVal)); //get the whole data of geonames first then save in variable
  const geoData = getGeoNames(currentVal);
  console.log(geoData.then((data)=> {  //data parameter here is just getGeoNames(currentVal); use .then on geoData to get specifics
    const lat=data.geonames[0].lat;
    const lng=data.geonames[0].lng;
    const cityName=data.geonames[0].name;
   console.log(getWeatherBit(currentVal,lat,lng));
  
const pixabayPhoto = getPixabay(cityName);
console.log(pixabayPhoto.then((data)=>{           //use .then on pixabayPhoto to get the specific object
  console.log(data.hits[1]);
  travelDetails.style.display="none";
}));
  })

  )

  })
 
 
;

//add saved trip show container box

export { getGeoNames }
export { getWeatherBit }
export { getPixabay }



  









