import './style/dropDown.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import temp from './style/img/temp.svg'
import umidade from './style/img/umidade.svg'
import probChuva from './style/img/probChuva.svg'
import sensaTemp from './style/img/sensaTerm.svg'
import vento from './style/img/vento.svg'


function DropDown() {
  
    const [data, setData] = useState('');

    
    useEffect(() => {
      axios.get('http://127.0.0.1:5000/apiRealtime')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

    if(!data){
        return (
            <div className='divSelects'>

                <div className="divTempo">
                Temperatura (C°)
                </div>

                <div className="divTempo">
                Umidade (%)
                </div>

                <div className="divTempo">
                Probabilidade de Chuva (%)
                </div>

                <div className="divTempo">
                Sensação Térmica (C°)
                </div>

                <div className="divTempo">
                Velocidade do Vento (Km/h)
                </div>

            </div>
        );
    }
    else{
        return (
            <div className='divSelects'>

                <div className="divTempo">
                {/* <img className='imgsvg' src={temp}></img> */}
                Temperatura ({data.data.values.temperature} C°)
                </div>
                
                <div className="divTempo">
                {/* <img className='imgsvg' src={umidade}></img> */}
                Umidade ({data.data.values.humidity} %)
                </div>

                <div className="divTempo">
                {/* <img className='imgsvg' src={probChuva}></img> */}
                Probabilidade de Chuva ({data.data.values.precipitationProbability} %)
                </div>

                <div className="divTempo">
                {/* <img className='imgsvg' src={sensaTemp}></img> */}
                Sensação térmica ({data.data.values.temperatureApparent} C°)
                </div>

                <div className="divTempo">
                {/* <img className='imgsvg' src={vento}></img> */}
                Velocidade do Vento ({data.data.values.windSpeed} Km/h)
                </div>
            </div>
        );
    }
}



export default DropDown;
