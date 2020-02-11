import { handleClear } from '../js/formReset'
import { dateValid, getTimeFromDate, days_between } from '../js/helpers'
const regeneratorRuntime = require("regenerator-runtime");

function dataValid(place, date) {
    // check what text was put into the form field
    if (!place || !date) {
        alert('* Please enter both place and depart date!')
        return false;
    } else if (!dateValid(date)) {
        alert('* Please enter date in the correct format!')
        return false;
    } else if (getTimeFromDate(date) < Date.now()) {
        alert('* Please enter a date in the future!')
        return false;
    }
    return true;
}
function handleSubmit(event) {
    event.preventDefault()
    handleClear(event, true)

    const place = document.getElementById('place').value
    const date = document.getElementById('departDate').value

    if (!dataValid(place, date)) {
        return;
    }

    getGeoNameInfo(place)
    .then(placeDetails => {
        placeDetails && getWeatherDataUrl()
        .then(reqUrl => getWeatherData(reqUrl, placeDetails, getTimeFromDate(date), place))
        .then(weatherDetails => postData('http://localhost:8060/weather', weatherDetails))
        .then(() => {
            updateUI();
        })
    })
    
    getPictureDataUrl(place)
    .then(reqUrl => {
        getPlaceImage(reqUrl, place)
        .then(res => {
            const imageBox = document.getElementById('placeImage');
            imageBox.style.backgroundImage = `url(${res.imageURL})`;
        })
    })
}

const getGeoNameInfo = async (place) => {
    let searchQuery = encodeURIComponent(place)
    const request = await fetch(`http://api.geonames.org/postalCodeSearchJSON?placename=${searchQuery}&username=skhan2020`);
    try {
      const data = await request.json();
      // return allData;
      if (data.postalCodes && data.postalCodes.length) {
        console.log(data.postalCodes.length);
        return data.postalCodes[0];
      }
      return;
    }
    catch(error) {
      console.log('error',error);
    }
}

/* Function to GET Web API URL */
const getWeatherDataUrl = async () => {
  try {
    const requestURLres = await fetch("http://localhost:8060/weatherDetailsURL");
    const requestURL = await requestURLres.json();
    // return requestURL
    console.log(requestURL);
    return requestURL;
  }
  catch(error) {
    console.log('error',error);
  }
}

/* Function to GET Web API Data*/
const getWeatherData = async (reqUrl, details, time, place) => {
  const currentDate = Date.now();
  const miliSecInweek = 604800000;
  let requestUrl = `${reqUrl.apiUrl}${details.lat},${details.lng}`
  if (time - currentDate > miliSecInweek) {
    requestUrl = `${reqUrl.apiUrl}${details.lat},${details.lng},${time/1000}`
  }
  try {
    const request = await fetch(requestUrl);
    const data = await request.json();
    // return allData;
    const dailyData = data && data.daily && data.daily.data.length && data.daily.data[0];
    const allData = {
      minTemp: dailyData.temperatureLow || '',
      maxTemp: dailyData.temperatureHigh || '',
      summary: dailyData.summary || '',
      place: dailyData.placeName || place,
      noOfDay: days_between(time, currentDate) || 0,
    }
    console.log(allData);
    // Save data in server

    return allData;
  }
  catch(error) {
    console.log('error',error);
  }
}

/* Function to GET Web API URL */
const getPictureDataUrl = async () => {
  const requestURLres = await fetch("http://localhost:8060/pictureURL");
  try {
    const requestURL = await requestURLres.json();
    // return requestURL
    console.log(requestURL);
    return requestURL;
  }
  catch(error) {
    console.log('error',error);
  }
}

/* Function to GET Web API Data*/
const getPlaceImage = async (reqURL, place) => {
  const defaultImage = 'https://pixabay.com/get/55e2d645485aa914f6da8c7dda79367b1438dfe356596c4870277ad0934bc55bbf_1280.jpg'
  const requestUrl = `${reqURL.apiUrl}&q=${place}&image_type=photo`
  const request = await fetch(requestUrl);
  try {
    const data = await request.json();
    // return allData;
    const image = data.hits.length && data.hits[0].webformatURL;
    console.log(image);
    return {imageURL: image || defaultImage};
  }
  catch(error) {
    console.log('error',error);
  }
}

/* Function to POST data */
const postData = async (url='', data={}) => {
  const response = await fetch (url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }) 
  try {
    if (response.status == 200) { return;}
  } catch (error) {
    console.log('error',error);
  }
}

/* Function to GET Project Data */

const updateUI = async () => {
    const placeDataRes = await fetch('http://localhost:8060/all');
    try {
        const placeData = await placeDataRes.json();
        document.getElementById('placeDetail').innerHTML = `${placeData.place} is ${placeData.noOfDay} days away!`;
        document.getElementById('weather').innerHTML = `Typical weather for then is:`;
        document.getElementById('temp').innerHTML = `High ${placeData.minTemp} Low ${placeData.maxTemp}`;
        document.getElementById('details').innerHTML = placeData.summary;
    }
    catch (error) {
        console.log("error", error);
    }
}

export { handleSubmit, dataValid }
