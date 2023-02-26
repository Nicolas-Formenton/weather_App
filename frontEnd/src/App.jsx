import React, { useEffect, useState } from "react";
import FormatDate from './date'
import { format } from 'date-fns';

function App() {
  const [dataState, setDataState] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("../data.json");
      const data = await response.json();
      setDataState(data);
    };

    fetchData();
  }, []);

  console.log(dataState);

  return (
    <div>
      {dataState && dataState.data && dataState.data.timelines.map((timeline, index) => (
          <div key={index}>
            <p>Inicio da aplicação: {FormatDate(timeline.startTime)}</p>
            <p>Final da aplicação: {FormatDate(timeline.endTime)}</p>
            <hr></hr>
            {timeline.intervals.map((interval, index) => (
              <div key={index}>
                <p>{FormatDate (interval.startTime)}</p>
                <p>Temperatura: {interval.values.temperature} °C</p>
                <p>Humidade: {interval.values.humidity} %</p>
                <p>Velocidade do vento: {interval.values.windSpeed} km/h</p>
                <p>Evapotranspiração: {interval.values.evapotranspiration} mm/dd</p>
                <p>Probabilidade de precipitação: {interval.values.precipitationProbability} %</p>
                <p>Acumulo de chuva: {interval.values.rainAccumulation} mm/dd</p>
                <hr></hr>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
}

export default App;
