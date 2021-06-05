
const search = document.getElementById("zip");
const searchValue = search.value;


async function getGeoNames(input) {
    const geoUser = process.env.GEO_API_KEY;
    //make request to url
    const response = await fetch(`http://api.geonames.org/searchJSON?q=${input}&maxRows=1&username=${geoUser}`);
    const data = await response.json();
    const latLng = {
      lat:data.geonames[0].lat,
      lng:data.geonames[0].lng
       }
  return getWeatherBit(latLng.lat, latLng.lng)
  }

  
async function getWeatherBit(lat, lng) {
  const wbUser = process.env.WEATHERBIT_KEY;
  //make request to url
  const response = await fetch(`https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lng}&key=${wbUser}`);
  const data = await response.json();
  const weatherInfo = {
    temp: data.data[0].temp,
    windSpeed: data.data[0].wind_spd,
    description: data.data[0].weather.description,
    precipitation: data.data[0].precip
  } 
  const container = document.querySelector(".container");
  container.innerHTML = `
  <p>Temperature: ${weatherInfo.temp}</p>
  <p>Wind Speed: ${weatherInfo.windSpeed}</p>
  <p>Description: ${weatherInfo.description}</p>
  <p>Precipitation: ${weatherInfo.precipitation}</p>
  `
  
  return weatherInfo;
};


const button = document.getElementById("generate");
button.addEventListener("click", () => {
  getGeoNames(searchValue)
 
 
});



export { getGeoNames }
export { getWeatherBit }



  









