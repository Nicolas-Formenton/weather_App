import { useEffect, useState } from 'react';
import axios from 'axios';
import apiPages from './style/apiPages.css'

// API CAFE RETRIEVE
function ApiCafe() {
  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/apiCafe')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  if (!data) {
    return <div>Loading data...</div>;
  }

  return (
    <div>
      {data.data.timelines.map((timeline, index) => (
        <div key={index}>
          {/* <h2>{timeline.startTime} - {timeline.endTime}</h2> */}
          <div className='api'>
            {timeline.intervals.map((interval, index) => (
              <ul className='list' key={index}>
                <li>{interval.startTime}</li>
                <p>Temperature: {interval.values.temperature}°C</p>
                <p>Humidity: {interval.values.humidity}%</p>
                <p>Wind speed: {interval.values.windSpeed} km/h</p>
                <p>Evapotranspiration: {interval.values.evapotranspiration} mm/h</p>
                <p>Precipitation probability: {interval.values.precipitationProbability}%</p>
                <p>Rain accumulation: {interval.values.rainAccumulation} mm/h</p>
              </ul>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApiCafe;
