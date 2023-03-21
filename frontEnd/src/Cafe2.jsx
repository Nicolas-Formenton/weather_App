import { useEffect, useState } from 'react';
import axios from 'axios';
import './style/apiPages.css'
import Page2 from './page2';
import Loading  from './loading'
import FormatDate from './date';
import { format } from 'date-fns';
import Cafe from './Cafe';

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



    //BRILHO DA ARROW LEFT
    const handleMouseEnter = () => {
    const arrowIcon = document.querySelector(".svgarrowleft");
    arrowIcon.style.transform = "translateX(-5px)";
    arrowIcon.style.strokeWidth = "1px";
  };
  
  const handleMouseLeave = () => {
    const arrowIcon = document.querySelector(".svgarrowleft");
    arrowIcon.style.transform = "none";
    arrowIcon.style.strokeWidth = "0px";
  };

  //Ativação e desativação das paginas
  const [destination, setDestination] = useState("");

  const handleButtonBack = () => {
    setDestination("back");
  };

  if (destination === "back") {
    return <Cafe />;
  }

  if (!data) {    
    return (
      <div>
          <button className='btnback' onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} onClick={handleButtonBack}><svg className='svgarrowleft' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z"/></svg>
        </button> 
        <Loading />
        <p className='loadingdata'>Loading data...</p>
      </div>
    )
  }

  return (
    <div className='divpai'>
      <button className='btnback' onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} onClick={handleButtonBack}><svg className='svgarrowleft' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><path d="M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z"/></svg>
      </button>

      <div className='semNome'>
          <strong>ApiCafé</strong>
      </div>

      {data.data.timelines.map((timeline, index) => (
        <div key={index} className='divLista'>
          {/* <h2>{timeline.startTime} - {timeline.endTime}</h2> */}
          <div>
            {timeline.intervals.map((interval, index) => (
              <ul key={index}>
                {/* <li>{FormatDate(interval.startTime)}</li> */}
                <li><strong>{FormatDate(interval.startTime)}</strong></li>
                <li>Temperature: <strong>{interval.values.temperature} °C</strong></li>
                <li>Humidity: <strong>{interval.values.humidity} %</strong></li>
                <li>Wind speed: <strong>{interval.values.windSpeed} km/h</strong></li>
                <li>Evapotranspiration: <strong>{interval.values.evapotranspiration} mm/h</strong></li>
                <li>Precipitation probability: <strong>{interval.values.precipitationProbability} %</strong></li>
                <li>Rain accumulation: <strong>{interval.values.rainAccumulation} mm/h</strong></li>
              </ul>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ApiCafe;
