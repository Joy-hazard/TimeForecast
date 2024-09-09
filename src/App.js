import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { CDBBtn, CDBIcon, CDBBox } from 'cdbreact';
import axios from 'axios';
import './App.css';
import logo from './JP-removebg.png'; // Import image

function App() {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch weather data
    const fetchWeather = async () => {
      try {
        // Fetch weather data for Dhaka, Bangladesh
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=909d9e774466407f9a163605240909&q=Dhaka&aqi=no`);
        setWeather(response.data);
      } catch (err) {
        setError('Error fetching weather data');
      }
    };

    fetchWeather();

    // Update time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    // Clean up interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <Container>
        <Row className="justify-content-center mt-5">
          <Col md={6}>
            <Card className="text-center">
              <Card.Body>
                <Card.Title className="text-large">Current Date and Time</Card.Title>
                <Card.Text className="text-large">
                  {time.toLocaleDateString()}<br />
                  {time.toLocaleTimeString()}
                </Card.Text>
              </Card.Body>
            </Card>
            {weather && (
              <Card className="weather-card mt-3">
                <Card.Body>
                  <Card.Title>Weather Information</Card.Title>
                  <Card.Text>
                    <strong>{weather.location.name}</strong><br />
                    Temperature: {weather.current.temp_c}°C<br />
                    Weather: {weather.current.condition.text}<br />
                    Humidity: {weather.current.humidity}%<br />
                    Wind Speed: {weather.current.wind_kph} kph
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
            {error && (
              <Card className="mt-3 text-center">
                <Card.Body>
                  <Card.Text className="text-danger">
                    {error}
                  </Card.Text>
                </Card.Body>
              </Card>
            )}
          </Col>
        </Row>
      </Container>
      <footer className="shadow">
        <CDBBox
          display="flex"
          justifyContent="between"
          alignItems="center"
          className="mx-auto py-4 flex-wrap"
          style={{ width: '80%' }}
        >
          <CDBBox display="flex" alignItems="center">
            <a href="/" className="d-flex align-items-center p-0 text-dark">
              <img
                alt="logo"
                src={logo} // Use imported image
                width="50px"
              />
              <span className="ms-4 h5 mb-0 font-weight-bold">Joy Pal</span>
            </a>
            <small className="ms-2">&copy; Joy Pal, 2024. All rights reserved.</small>
          </CDBBox>
          <CDBBox display="flex">
            <CDBBtn flat color="dark" className="p-2">
              <CDBIcon fab icon="facebook-f" />
            </CDBBtn>
            <CDBBtn flat color="dark" className="mx-3 p-2">
              <CDBIcon fab icon="twitter" />
            </CDBBtn>
            <CDBBtn flat color="dark" className="p-2">
              <CDBIcon fab icon="instagram" />
            </CDBBtn>
          </CDBBox>
        </CDBBox>
      </footer>
    </>
  );
}

export default App;
