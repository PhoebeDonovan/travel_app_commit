// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1) + '.' + d.getDate() + '.' + d.getFullYear();

// API Keys
const geoApiKey = 'Soph13';
const weatherBitApiKey = '80aee9f45fa64af9a37f78ca57292048';
const pixabayApiKey = '38378808-06119754e49cc79e1d83890eb';
const visualCrossing = '6V2W7DPS5FP4QDZ4TCN4DR9QT';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generateButtonClicked);

/* Function to fetch weather data */
async function generateButtonClicked() {
  const city = document.getElementById('city').value;
  const startDate = new Date(document.getElementById('start_date').value);
  const endDate = new Date (document.getElementById('end_date').value);
  let latitude, longitude, countryName;
  
  if (document.getElementById('city').value == '') {
    alert("Enter a city name");
    return;
  }

   try {
    // Fetch geonames data
    const geonamesResponse = await fetch(
      `http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geoApiKey}`
    );
    if (!geonamesResponse.ok) {
      throw new Error('Error: ' + geonamesResponse.status);
    }
    const geonamesData = await geonamesResponse.json();

    // Process the retrieved geonames data
    latitude = geonamesData.geonames[0].lat;
    longitude = geonamesData.geonames[0].lng;
    countryName = geonamesData.geonames[0].countryName;

    // console.log geonames data
    console.log('Latitude:', latitude);
    console.log('Longitude:', longitude);
    console.log('Country Name:', countryName);

    // Fetch country image from Pixabay API
    const pixabayResponse = await fetch(
      `https://pixabay.com/api/?key=${pixabayApiKey}&q=${encodeURIComponent(countryName)}&image_type=photo`
    );
    if (!pixabayResponse.ok) {
      throw new Error('Error: ' + pixabayResponse.status);
    }
    const pixabayData = await pixabayResponse.json();

    // Process the retrieved country image data
    let imageUrl = '';
    if (pixabayData.hits[0]['id'] != 217186 && pixabayData.hits.length > 0) {
      imageUrl = pixabayData.hits[0].webformatURL;
    } else {
      imageUrl = 'https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'; // Provide a default image URL in case no image is found
    }

    // Display the country image
    const countryImage = document.getElementById('countryImage');
    countryImage.src = imageUrl;
    if (imageUrl != '') {
      countryImage.style.display = 'block';
    }
    countryImage.alt = `Image of ${countryName}`;
    
    //Process country image text with countryName
    let imageHeaderHTML = '';
    if (pixabayData.hits[0]['id'] != 217186  && pixabayData.hits.length > 0){imageHeaderHTML += `
      <div>
        <h4>Enjoy your visit to ${countryName}<h4>
      </div>
    `;
    } else {imageHeaderHTML += `
      <div>
        <h4>You're still on Earth, but did you enter a city name above?<h4>
      </div>
    `;
    }
    //Update DOM
    document.getElementById('imageHeader').innerHTML = imageHeaderHTML;
  
    // Retrieve weather data
    if (!startDate == d && !endDate == d) {
      // Use Visual Crossing API for dates other than current date
      const visualCrossingUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}/${startDate.toISOString()}/${endDate.toISOString()}?key=${visualCrossing}`;
      const visualCrossingResponse = await fetch(visualCrossingUrl);
      if (!visualCrossingResponse.ok) {
        throw new Error('Error: ' + visualCrossingResponse.status);
      }
      const visualCrossingData = await visualCrossingResponse.json();
      // Process and display visualCrossing data for each date
      let weatherDataHTML = '';
      for (const forecast of visualCrossingData.days) {
        const date = forecast.datetime;
        const max_temp = forecast.tempmax;
        const min_temp = forecast.tempmin;
        const weather = forecast.conditions;
  
        // Update the DOM elements with weather data for each date
        weatherDataHTML += `
          <div>
            <p>Date: ${date}</p>
            <p>Weather: ${weather}</p>
            <p>Maximum temperature: ${max_temp}</p>
            <p>Minimum temperature: ${min_temp}</p>
          </div>
        `;
      }
        
      // Update the weatherData div with the generated HTML
      document.getElementById('weatherData').innerHTML = weatherDataHTML;
      } else {
      // Use Weatherbit API for dates other than current day
      const weatherBitResponse = await fetch(
      `https://api.weatherbit.io/v2.0/forecast/daily?lat=${latitude}&lon=${longitude}&days=1&key=${weatherBitApiKey}`
    );
    if (!weatherBitResponse.ok) {
      throw new Error('Error: ' + weatherBitResponse.status);
    }
    const weatherBitData = await weatherBitResponse.json();

      // Process and display weatherbit data for each date
      let weatherDataHTML = '';
      for (const forecast of weatherBitData.data) {
        const date = forecast.datetime;
        const max_temp = forecast.max_temp;
        const min_temp = forecast.min_temp;
        const weather = forecast.weather.description;
  
        // Update the DOM elements with weather data for each date
        weatherDataHTML += `
          <div>
            <p>Date: ${date}</p>
            <p>Weather: ${weather}</p>
            <p>Maximum temperature: ${max_temp}</p>
            <p>Minimum temperature: ${min_temp}</p>
          </div>
        `;
      }
  
      // Update the weatherData div with the generated HTML
      document.getElementById('weatherData').innerHTML = weatherDataHTML;
    }
  } catch (error) {
    console.log(error);
  }
}
/* Function to POST data */
// Client-side function to make a POST request and add an entry
async function addEntry(url, entryData) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entryData),
    });

    if (response.ok) {
      console.log('Entry added successfully');
    } else {
      throw new Error('Error: ' + response);
    }
  } catch (error) {
    console.log(error);
  }
}

export {
  generateButtonClicked,
  addEntry
}
