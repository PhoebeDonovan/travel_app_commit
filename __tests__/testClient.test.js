// Import the functions to be tested
import { generateButtonClicked, addEntry } from '../src/client/js/app';

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

describe('generateButtonClicked', () => {
  it('should fetch geonames data and update DOM correctly', async () => {
    // Mock DOM elements
    document.body.innerHTML = `
      <input type="text" id="city" value="London">
      <input type="date" id="start_date" value="2023-08-05">
      <input type="date" id="end_date" value="2023-08-06">
      <button id="generate">Generate</button>
      <div id="countryImage"></div>
      <div id="imageHeader"></div>
      <div id="weatherData"></div>
    `;

    // Call the function to be tested
    await generateButtonClicked();

    // Check if fetch function was called with the correct URL
    expect(fetch).toHaveBeenCalledWith(
      'http://api.geonames.org/searchJSON?q=London&maxRows=1&username=Soph13'
    );

  });
});

describe('addEntry', () => {
  it('should make a POST request with the correct data', async () => {
    // Mock URL and entryData
    const url = 'https://example.com/addEntry';
    const entryData = {
      city: 'London',
      startDate: '2023-08-05',
      endDate: '2023-08-10',
      // Add other data as needed
    };

    // Call the function to be tested
    await addEntry(url, entryData);

    // Check if fetch function was called with the correct URL and data
    expect(fetch).toHaveBeenCalledWith(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(entryData),
    });
  });

});
