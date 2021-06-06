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
  const slicedStart=startDateValue.slice(8,10)
  const endDateValue=endDate.value;
  const slicedEnd=endDateValue.slice(8,10);

  const container = document.querySelector(".container");
  const inputName=name;
  const finalName=inputName.charAt(0).toUpperCase()+inputName.slice(1);
  container.innerHTML = `
  <div class="box1"> 

  <p>Trip to: ${finalName}, ${weatherInfo.countryCode}</p>
  <p>Departure: ${startDate.value}</p>
  <p>Return: ${endDate.value}</p>
  <p>Trip length: ${slicedEnd-slicedStart}</p>
  <p>Temperature: ${weatherInfo.temp}</p>
  <p>Description: ${weatherInfo.description}</p>
  </div>
  `
 
 
  return weatherInfo;
};

async function getPixabay(input) {
  
  const pixabayAPI = process.env.PIX_API_KEY;
  //make request to url
  const response = await fetch(`https://pixabay.com/api/?key=${pixabayAPI}&q=${input}&image_type=photo`);
  const data = await response.json();
  const photo = document.querySelector(".photo")
  photo.innerHTML=` <img src="${data.hits[1].webformatURL}" alt="">`;

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
   console.log(getWeatherBit(currentVal,lat,lng));
  
const pixabayPhoto = getPixabay(cityName);
console.log(pixabayPhoto.then((data)=>{           //use .then on pixabayPhoto to get the specific object
  console.log(data.hits[1]);
}));
  })

  )

  })
 
 
;





export { getGeoNames }
export { getWeatherBit }
export { getPixabay }



  









