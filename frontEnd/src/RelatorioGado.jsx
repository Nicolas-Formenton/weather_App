import './style/relatorioGado.css'
import { useState, useEffect } from 'react';
import apiPages from './style/ApiPages.css';
import relatorio from './style/relatorio.css';
import Page2 from './page2';
import { format } from 'date-fns';
import ApiGado from './Gado2'
import Cafe from './Cafe'
import Gado from './Gado'
import MenuBar from './menubar'
import Relatorio from "./Relatorio";
import axios from 'axios';

function RelatorioGado() {

  //Ativação e desativação das paginas
  const [destination, setDestination] = useState("");

  const handleButtonCafe = () => {
    setDestination("cafe");
  };

  const handleButtonGado = () => {
    setDestination("gado");
  };

  const handleButtonPage2 = () => {
    setDestination("page2");
  };

  const handleButtonRelatorio = () => {
    setDestination("relatorio");
  };

  const handleButtonRelatorioGado = () => {
  setDestination("relatorioGado");
  };


  const handleButtonBack = () => {
    setDestination("back");
  };

  const handleButtonForward = () => {
    setDestination("apiCafe")
  };

  const [data, setData] = useState('');

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/apiProdutosGado')
      .then(response => {
        setData(response.data);
        console.log(JSON.stringify(data))
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  //MenuBar barras
  const exibirBarraSuperiorRelatorio = true;
  const exibirBarraSuperiorCafe = false;
  const exibirBarraSuperiorGado = false;
  const exibirBarraSuperiorHome = false;



  if (destination === "back") {
    return <Page2 />;
  }
  else if(destination == "apiCafe"){
    return <ApiCafe/>;
  }
  if (destination === "cafe") {
    return <Cafe />;
  }
  else if (destination === "gado") {
    return <Gado />;
  }
  else if (destination === "page2") {
    return <Page2 />;
  }
  else if (destination === "relatorio") {
    return <Relatorio />;
  }
  else if(destination == "relatorioGado"){
    return <RelatorioGado />;
  }
  else{
    return (
      <form className='divInput'>
        <div className='divGadoPai'>
          Manutenção do Relatório Gado
        </div>






              {/* AQUI É A  MENUBAR */}

              <div className='barra'>
        <div>
        {exibirBarraSuperiorHome && <div className="barraSuperiorHome" ></div>}
        <button onClick={handleButtonPage2} className='btnmenubar' type='button'>
            <svg className='svgHome' height="50px" width="50px" fill="#204b5e" viewBox="-4.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>home</title> <path d="M19.469 12.594l3.625 3.313c0.438 0.406 0.313 0.719-0.281 0.719h-2.719v8.656c0 0.594-0.5 1.125-1.094 1.125h-4.719v-6.063c0-0.594-0.531-1.125-1.125-1.125h-2.969c-0.594 0-1.125 0.531-1.125 1.125v6.063h-4.719c-0.594 0-1.125-0.531-1.125-1.125v-8.656h-2.688c-0.594 0-0.719-0.313-0.281-0.719l10.594-9.625c0.438-0.406 1.188-0.406 1.656 0l2.406 2.156v-1.719c0-0.594 0.531-1.125 1.125-1.125h2.344c0.594 0 1.094 0.531 1.094 1.125v5.875z"></path> </g></svg>
          </button>
        </div>

        <div>
        {exibirBarraSuperiorCafe && <div className="barraSuperiorCafe" ></div>}
        <button onClick={handleButtonCafe} className='btnmenubar' type='button'>
        <svg  className='svgCafe'  height="50px" width="50px" fill="#204b5e" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 470.047 470.047" xml:space="preserve"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path d="M420.624,226.102c-22.399-22.4-48.199-37.5-73.3-44.6c-0.5,9-1.6,18.3-3.6,27.7c-1,4.8-2.2,9.7-3.601,14.5 c14,16.9,20.2,34.4,25.301,49.8c5.5,16.899,9.8,31.5,19.8,44.5c2.8,3.699,6.3,7.699,10.3,11.699c10.5,10.5,24.3,21.2,36.6,29.2 c12,8.101,23.9,13.5,26.301,13.601c0.3,0.1,0.6,0.199,0.8,0.299C482.624,334.902,467.324,272.801,420.624,226.102z"></path> <path d="M440.925,392.902c-6.801-3.101-14.101-7.399-22.4-12.7c-13.7-8.9-28.5-20.4-40.9-32.699c-4.699-4.701-9-9.5-12.699-14.4 c-13.5-17.9-18.5-36-23.801-52.2c-3.3-10-6.6-19.3-11.6-28.2c-12.9,29.2-32.4,57.4-57,82c-0.9,0.9-1.8,1.7-2.7,2.6 c5.4,7.301,11.6,14.5,18.4,21.301C337.524,407.801,403.824,422.102,440.925,392.902z"></path> <path d="M15.824,346.902c0.4-0.101,0.8-0.399,1.2-0.399c3.4-0.201,20.7-8.101,38.1-19.801c17.9-11.699,37.8-27.199,53.1-42.5 c5.8-5.8,10.9-11.6,15-16.9c14.4-18.899,20.7-40.099,28.7-64.699c8-24.3,17.9-52.1,42.1-78.6c1-1.1,2.2-2.4,3.5-3.8 c19.5-19.4,41.2-26.6,60.2-33.9c8.199-3.2,16.1-6.4,23.899-10.3c-16.5-9.3-36-13.9-56.899-13.9c-49.1,0-106.4,25-153.1,71.7 C3.824,201.702-18.275,291.801,15.824,346.902z"></path> <path d="M321.925,241.301c3.699-9.199,6.699-18.299,9-27.399c3-11.9,4.699-23.7,5.1-35.1c1-29.6-6.8-56.5-24.1-76.9 c-14.7,9.1-28.9,14.8-41.2,19.5c-20.101,7.5-34.8,13.1-46.7,25.1c-0.6,0.6-1.3,1.4-2.2,2.4c-18.5,20.3-26.3,41.1-34.1,64.8 c-7.7,23.5-14.9,49.9-34.6,75.8c-5.4,7.1-11.7,14.1-18.5,20.899c-17.9,17.899-39.5,34.601-59.4,47.5c-12,7.7-22.7,13.899-32.5,18.5 c18.7,14.7,42.5,21.8,68.7,21.8c48.7,0,105.4-24.6,151.9-70.6c0.4-0.4,0.8-0.801,1.2-1.1 C290.624,300.402,309.925,270.801,321.925,241.301z"></path> </g> </g></svg>
        </button>
        </div>

        <div>
        {exibirBarraSuperiorGado && <div className="barraSuperiorGado" ></div>}
        <button onClick = {handleButtonGado} className='btnmenubar' type='button'>
            <svg className='svgGado'  height="50px" width="50px" version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 512 512" xml:space="preserve" fill="#204b5e" stroke="#204b5e"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <g> <path class="st0" d="M508.814,298.717c0,0-3.011-45.186-3.011-66.266c0-18.84-7.226-38.239-18.435-44.31 c-14.85-32.44-67.54-30.799-89.424-30.799c-25.605,0-82.032-1.538-106.88-1.538s-79.107-7.13-107.716-15.407 c-28.616-8.286-47.066-23.717-50.826-19.207c-3.761,4.524-11.297,9.798-21.836,8.285c21.836-8.285,20.33-31.619,17.32-34.63 c-3.012-3.012-15.065-3.768-26.354,9.783c6.772-12.802-6.031-30.113-12.802-33.881c-6.78-3.768-13.552-2.263-8.286,1.505 c5.274,3.769,8.286,20.331,0.757,27.111c0,0-23.342,14.3-27.858,17.319c-4.517,3.012-33.134,39.904-38.407,42.916 C9.79,162.608,0,167.874,0,170.894c0,3.012,11.296,25.971,17.319,25.971c6.023,0,53.081,5.648,82.446,7.911 c0,0,18.833,30.52,28.242,57.598c5.09,14.667,10.539,45.457,17.319,57.582c14.3,25.596,33.133,47.432,33.133,60.984 c0,13.559,0,43.672,0,43.672l-8.285,14.308c0,0,6.023,3.768,17.319,3.768c11.297,0,12.795-8.285,12.795-12.053 c0-3.761,0-56.467,0-56.467s-3.011-14.308-3.011-23.35c0-9.034,12.053-57.224,12.802-63.995c0,0,1.506,16.562,1.506,21.08 c0,0,35.1,12.165,53.089,13.957c30.114,3.011,51.201,9.042,94.874,4.517c35.323-3.649,63.294-24.497,63.294-24.497 s-3.02-14.308,0.749-21.836c6.022,42.167,40.661,71.532,40.661,73.786c0,2.263-5.313,70.058-5.313,70.058l-6.78,15.814 c0,0,2.302,3.736,13.599,3.736s15.057-6.779,15.057-15.057c0-8.285,15.057-79.068,15.814-84.334 c0.757-5.274-4.517-42.924-6.023-46.684c-1.179-2.956-0.048-51.895,0.502-76.407c6.509,21.884,7.282,57.756,5.665,68.719 c-3.386,22.959,6.022,45.178,6.022,45.178s3.012,7.528,7.529-9.034C514.837,309.257,508.814,298.717,508.814,298.717z"></path> </g> </g></svg>
          </button>
        </div>

        <div>
        {exibirBarraSuperiorRelatorio && <div className="barraSuperiorRelatorio"></div>}
        <button onClick = {handleButtonRelatorio} className='btnmenubar' type='button'>
        <svg className='svgRelatorio' height="50px" width="50px" fill="#204b5e" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>report</title> <path d="M6 11h4v17h-4v-17zM22 16v12h4v-12h-4zM14 28h4v-24h-4v24z"></path> </g></svg>
        </button>
        </div>
      </div>
    </form>
    );
  }
  
}

export default RelatorioGado;