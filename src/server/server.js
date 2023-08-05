// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
// Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('dist'));

// Setup Server
function feedbackCallback(message) {
  console.log(message);
}

// Port number
const port = 3000; 
app.listen(port, () => {
  feedbackCallback(`Server is running on port ${port}`);
});

app.get('/', function (req, res){
  res.sendFile('dist/index.html')
})

// POST route
app.post('/', (req, res) => {
  // Extract the API key from the request body
  apiKey = req.body.apiKey;

  // Call the fetchWeatherData() function
  fetchWeatherData()
    .then((data) => {
      // Process the data from the API response
      feedbackCallback(data);
      // Assign the data to the projectData data
      projectData = data;
    })
    .catch((error) => {
      // Handle the error
      feedbackCallback(error);
    });
});

// POST route to add an entry
app.post('/addEntry', (req, res) => {
    // Extract the data from the request body
    const entryData = req.body;
  
    // Add the entry to the projectData data
    const newEntry = {
      temperature: entryData.temperature,
      date: entryData.date,
      userResponse: entryData.userResponse,
    };
    projectData = newEntry;
  
    // Provide feedback through the callback function
    feedbackCallback('New entry added to projectData: ', projectData);
  
    // Send a response indicating successful addition of the entry
    res.send('Entry added successfully');
});

module.exports = app;
