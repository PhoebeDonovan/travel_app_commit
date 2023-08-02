Travel App README

Project Title
Travel App

Project Description
The Travel App is a web application that allows users to input a city and travel dates to get information about the destination. It provides weather forecasts for the specified travel dates and displays an image related to the country of the destination. The app uses multiple APIs to fetch weather data and country images, making it a handy tool for travelers to plan their trips effectively.

Usage
To use the Travel App, follow these steps:

Enter the name of the city you plan to visit in the "City" input field.
Choose the start and end dates of your travel using the date pickers.
Click on the "Generate" button to initiate the search.
The app will then display the following information:

- An image related to the country of the destination.
- Weather information for each day of your travel, including the date, weather conditions,        maximum temperature, and minimum temperature.

Dependencies
The Travel App relies on the following dependencies:

Backend Dependencies
Express (^4.18.2): A fast and minimalist web framework for Node.js used to build the server.
Body-parser (^1.20.2): Middleware for parsing incoming request bodies.
Node-fetch (^3.3.1): A module to fetch resources using HTTP/HTTPS, used for making API requests.
Frontend Dependencies
Webpack (^4.35.3) and Webpack-cli (^3.3.5): Used for bundling JavaScript modules and assets.
Babel-core (^7.22.9) and Babel-preset-env (^7.22.9): Used to transpile modern JavaScript to browser-compatible JavaScript.
Jest (^29.6.2), Jest-environment-jsdom (^29.6.1), and Jest-fetch-mock (^3.0.3): Used for testing purposes.
Html-webpack-plugin (^3.2.0): Simplifies creation of HTML files to serve the webpack bundles.
Clean-webpack-plugin (^3.0.0): Cleans the build folder before each build.
Css-loader (^2.1.1) and Style-loader (^1.3.0): Allows webpack to load CSS files.
Mini-css-extract-plugin (^0.11.3): Extracts CSS into separate files during the build process.
Optimize-css-assets-webpack-plugin (^5.0.4): Optimizes and minifies CSS assets.
Terser-webpack-plugin (^4.2.3): Minifies and uglifies JavaScript files.
Webpack-dev-server (^3.11.3): Serves the app during development and provides hot module replacement.
Workbox-webpack-plugin (^5.1.4): Provides service worker functionality for caching assets.
Please note that some API keys are used within the app to fetch data from third-party services. Ensure that you have valid and active API keys for the following services:

Geonames API (geoApiKey)
WeatherBit API (weatherBitApiKey)
Pixabay API (pixabayApiKey)
Visual Crossing API (visualCrossing)

Before running the app, make sure to install the required dependencies by running the following command:

npm install

How to Run the App
To run the Travel App, follow these steps:

Clone the repository to your local machine.
Install the required dependencies as mentioned above using the npm install command.
Start the development server using the following command:

npm run build-dev

Access the app in your web browser by visiting http://localhost:8080.
Enjoy using Your Travel App!
