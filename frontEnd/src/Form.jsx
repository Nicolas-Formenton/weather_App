import React, { useState } from "react";

function Form() {
  const [cityName, setCityName] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [finalDate, setFinalDate] = useState("");
  const [timesteps, setTimesteps] = useState("");

  const handleSubmit = (event) => {
    
    event.preventDefault();
    fetch("/form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        cityName: cityName,
        initialDate: initialDate,
        finalDate: finalDate,
        timesteps : timesteps
      }),
    })
      .then((response) => {
        // Handle response from Flask server
      })
      .catch((error) => {
        // Handle error
      });
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <label>
        City name:
        <input type="text" value={cityName} onChange={(event) => setCityName(event.target.value)}/>
      </label>
      <label>
        Inital Date:
        <input type="datetime-local" value={initialDate} onChange={(event) => setInitialDate(event.target.value)}/>
      </label>
      <label>
        Final Date:
        <input type="datetime-local" value={finalDate} onChange={(event) => setFinalDate(event.target.value)}/>
      </label>
      <label for="timesteps">Timesteps:</label>
        <br></br>
        <input type="radio" id="1h" name="timesteps" value={timesteps} onChange={(event) => setTimesteps(event.target.value)} />
        <label for="1h">1 Hour</label>
        <br></br>
        <input type="radio" id="1d" name="timesteps" value={timesteps} onChange={(event) => setTimesteps(event.target.value)} />
        <label for="1d">1 Day</label>
        <br></br>
      <button type="submit">Get Weather Data</button>
    </form>
  );
}

export default Form;