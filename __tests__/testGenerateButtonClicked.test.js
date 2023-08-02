// Import jest-fetch-mock
import 'jest-fetch-mock';

// Import the function to test
import { generateButtonClicked } from '../src/client/js/app';

// Mock fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({}),
  })
);

// Mock alert function
global.alert = jest.fn();

// Mock console.log function
console.log = jest.fn();

describe('generateButtonClicked', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should show an alert and not make a fetch request if city input is empty', async () => {
    // Arrange
    document.getElementById = jest.fn(() => ({
      value: '', // Empty city input
    }));

    // Act
    await generateButtonClicked();

    // Assert
    expect(global.alert).toHaveBeenCalledWith('Enter a city name');
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('should make a fetch request and display weather data for dates other than current date', async () => {
    // Arrange
    document.getElementById = jest.fn((id) => {
      if (id === 'city') return { value: 'New York' }; // City input is set
      if (id === 'start_date') return { value: '2023-08-01' }; // Start date input is set
      if (id === 'end_date') return { value: '2023-08-03' }; // End date input is set
    });

    global.Date = jest.fn(() => new Date('2023-08-01')); // Mock the current date to be August 1, 2023

    const geonamesResponse = {
      ok: true,
      json: () => Promise.resolve({
        geonames: [{ lat: '40.7128', lng: '-74.0060', countryName: 'United States' }],
      }),
    };
    const pixabayResponse = {
      ok: true,
      json: () => Promise.resolve({
        hits: [{ webformatURL: 'https://example.com/image.jpg' }],
      }),
    };
    const visualCrossingResponse = {
      ok: true,
      json: () => Promise.resolve({
        days: [{
          datetime: '2023-08-01',
          tempmax: 30,
          tempmin: 20,
          conditions: 'Sunny',
        }, {
          datetime: '2023-08-02',
          tempmax: 28,
          tempmin: 18,
          conditions: 'Partly Cloudy',
        }, {
          datetime: '2023-08-03',
          tempmax: 25,
          tempmin: 17,
          conditions: 'Cloudy',
        }],
      }),
    };

    // Mock fetch responses
    global.fetch
      .mockImplementationOnce(() => Promise.resolve(geonamesResponse))
      .mockImplementationOnce(() => Promise.resolve(pixabayResponse))
      .mockImplementationOnce(() => Promise.resolve(visualCrossingResponse));

    // Act
    await generateButtonClicked();

    // Assert
    expect(global.alert).not.toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(3);
    expect(document.getElementById('countryImage').src).toBe('https://example.com/image.jpg');
    expect(document.getElementById('weatherData').innerHTML).toContain('Date: 2023-08-01');
    expect(document.getElementById('weatherData').innerHTML).toContain('Weather: Sunny');
    expect(document.getElementById('weatherData').innerHTML).toContain('Maximum temperature: 30');
    expect(document.getElementById('weatherData').innerHTML).toContain('Minimum temperature: 20');
    expect(document.getElementById('weatherData').innerHTML).toContain('Date: 2023-08-02');
    expect(document.getElementById('weatherData').innerHTML).toContain('Weather: Partly Cloudy');
    expect(document.getElementById('weatherData').innerHTML).toContain('Maximum temperature: 28');
    expect(document.getElementById('weatherData').innerHTML).toContain('Minimum temperature: 18');
    expect(document.getElementById('weatherData').innerHTML).toContain('Date: 2023-08-03');
    expect(document.getElementById('weatherData').innerHTML).toContain('Weather: Cloudy');
    expect(document.getElementById('weatherData').innerHTML).toContain('Maximum temperature: 25');
    expect(document.getElementById('weatherData').innerHTML).toContain('Minimum temperature: 17');
  });

  it('should make a fetch request and display weather data for current date', async () => {
    // Arrange
    document.getElementById = jest.fn((id) => {
      if (id === 'city') return { value: 'Paris' }; // City input is set
      if (id === 'start_date') return { value: '2023-08-01' }; // Start date input is set
      if (id === 'end_date') return { value: '2023-08-01' }; // End date input is set
    });

    global.Date = jest.fn(() => new Date('2023-08-01')); // Mock the current date to be August 1, 2023

    const geonamesResponse = {
      ok: true,
      json: () => Promise.resolve({
        geonames: [{ lat: '48.8566', lng: '2.3522', countryName: 'France' }],
      }),
    };
    const pixabayResponse = {
      ok: true,
      json: () => Promise.resolve({
        hits: [{ webformatURL: 'https://example.com/image.jpg' }],
      }),
    };
    const weatherBitResponse = {
      ok: true,
      json: () => Promise.resolve({
        data: [{
          datetime: '2023-08-01',
          max_temp: 30,
          min_temp: 20,
          weather: { description: 'Sunny' },
        }],
      }),
    };

    // Mock fetch responses
    global.fetch
      .mockImplementationOnce(() => Promise.resolve(geonamesResponse))
      .mockImplementationOnce(() => Promise.resolve(pixabayResponse))
      .mockImplementationOnce(() => Promise.resolve(weatherBitResponse));

    // Act
    await generateButtonClicked();

    // Assert
    expect(global.alert).not.toHaveBeenCalled();
    expect(global.fetch).toHaveBeenCalledTimes(3);
    expect(document.getElementById('countryImage').src).toBe('https://example.com/image.jpg');
    expect(document.getElementById('weatherData').innerHTML).toContain('Date: 2023-08-01');
    expect(document.getElementById('weatherData').innerHTML).toContain('Weather: Sunny');
    expect(document.getElementById('weatherData').innerHTML).toContain('Maximum temperature: 30');
    expect(document.getElementById('weatherData').innerHTML).toContain('Minimum temperature: 20');
  });

  it('should log an error when fetch fails', async () => {
    // Arrange
    document.getElementById = jest.fn((id) => {
      if (id === 'city') return { value: 'Invalid City' }; // Invalid city input
    });

    const errorMessage = 'Error: 404'; // This is an example error message

    // Mock fetch to return an error
    global.fetch = jest.fn(() => Promise.reject(new Error(errorMessage)));

    // Act
    await generateButtonClicked();

    // Assert
    expect(console.log).toHaveBeenCalledWith(new Error(errorMessage));
  });
});
