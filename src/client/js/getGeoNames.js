async function getGeoNames(input) {
    const geoUser = process.env.GEO_API_KEY;
    //make request to url
    const response = await fetch(`http://api.geonames.org/searchJSON?q=${input}&maxRows=1&username=${geoUser}`);
    const data = await response.json();
    return data
  }

  export {getGeoNames}