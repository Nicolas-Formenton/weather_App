import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [cityName, setCityName] = useState('');
  const [initialDate, setInitialDate] = useState('');
  const [finalDate, setFinalDate] = useState('');
  const [timesteps, setTimesteps] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      city_name: this.state.cityName,
      initial_date: this.state.initialDate,
      final_date: this.state.finalDate,
      timesteps: this.state.timesteps,
    };
    axios.post('http://localhost:5000/previsao', payload)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        City name:
        <input type="text" name="city_name" value={cityName} onChange={e => setCityName(e.target.value)} />
      </label>
      <label>
        Initial date:
        <input type="text" name="initial_date" value={initialDate} onChange={e => setInitialDate(e.target.value)} />
      </label>
      <label>
        Final date:
        <input type="text" name="final_date" value={finalDate} onChange={e => setFinalDate(e.target.value)} />
      </label>
      <label>
        Timesteps:
        <input type="text" name="timesteps" value={timesteps} onChange={e => setTimesteps(e.target.value)} />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}

export default App;