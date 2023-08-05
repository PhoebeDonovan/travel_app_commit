// server.test.js

const request = require('supertest');
const app = require('../src/server/server');

describe('Test the root path', () => {
  test('It should respond with status 200 and send index.html', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
    expect(response.type).toBe('text/html');
  });
});

describe('Test POST /addEntry', () => {
  test('It should respond with status 200 and a success message', async () => {
    const entryData = {
      temperature: '25°C',
      date: '2023-08-04',
      userResponse: 'Sunny day!',
    };

    const response = await request(app)
      .post('/addEntry')
      .send(entryData);

    expect(response.status).toBe(200);
    expect(response.text).toBe('Entry added successfully');
  });
});
