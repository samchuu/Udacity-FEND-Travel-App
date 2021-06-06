async function getGeoNames(input) {
    const geoUser = process.env.GEO_API_KEY;
    //make request to url
    const response = await fetch(`http://api.geonames.org/searchJSON?q=${input}&maxRows=1&username=${geoUser}`);
    const data = await response.json();
    return data
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

async function getPixabay(input) {
  
  const pixabayAPI = process.env.PIX_API_KEY;
  //make request to url
  const response = await fetch(`https://pixabay.com/api/?key=${pixabayAPI}&q=${input}&image_type=photo`);
  const data = await response.json();
  return data

}

const search = document.getElementById("zip");
const button = document.getElementById("generate");

button.addEventListener("click", () => {
  const currentVal = search.value;
  // console.log(getGeoNames(currentVal)); //get the whole data of geonames first then save in variable
  const geoData = getGeoNames(currentVal);
  console.log(geoData.then((data)=> {  //data parameter here is just getGeoNames(currentVal); use .then on geoData to get specifics
    // console.log(data);
    const lat=data.geonames[0].lat;
    const lng=data.geonames[0].lng;
    const cityName=data.geonames[0].name;
   console.log(getWeatherBit(lat,lng));
  
const pixabayPhoto = getPixabay(cityName);
console.log(pixabayPhoto.then((data)=>{           //use .then on pixabayPhoto to get the specific object
  console.log(data.hits[1].webformatURL);
}));
  })

  )

  })
 
 
;





export { getGeoNames }
export { getWeatherBit }
export { getPixabay }



  









