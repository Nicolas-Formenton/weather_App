import { useState, useEffect } from 'react';
import apiPages from './style/ApiPages.css';
import Page2 from './page2';
import { format } from 'date-fns';
import ApiGado from './apiGadoPage'
import MenuBar from './menubar'

function Gado() {

  const [cidade, setCidade] = useState('');
  const [dateEntrada, setDateEntrada] = useState('');
  const [dateSaida, setDateSaida] = useState('');

    //EFEITO CLICK BTNADDPRODUTO
    const handleMouseClickIn = () => {
        const btnaddproduto = document.querySelector(".btnaddproduto")
        btnaddproduto.style.transform = "translateY(3px)";
      };
    
      const handleMouseClickOut = () => {
        const btnaddproduto = document.querySelector(".btnaddproduto")
        btnaddproduto.style.transform = "translateY(0px)";
      };

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

      const handleButtonForward = () => {
        setDestination("apiGado")
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        // loop p ver no console o que está saindo do submit
        const formData = new FormData(e.target);
        const data = {};
        for (let [key, value] of formData.entries()) {
          data[key] = value;
        }
        console.log(JSON.stringify(data));
        
        // enviando dados do formulário pra api
        fetch('http://127.0.0.1:5000/dadosGado', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cidade,
            dateEntrada,
            dateSaida,
            timesteps
          })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
      };

//  Sumindo com as divs do menu

const handleAddVisibilityGado = () => {
  const element = document.querySelector('.barraSuperiorGado');
  element.classList.add('hidden');
};

const handleAddVisibilityRelatorio = () => {
  const element = document.querySelector('.barraSuperiorRelatorio');
  element.classList.add('hidden');
};

//MenuBar barras
const exibirBarraSuperiorRelatorio = false;
const exibirBarraSuperiorCafe = false;
const exibirBarraSuperiorGado = true;

  if (destination === "back") {
   return <Page2 />;
  }
  else if(destination == "apiGado"){
  return <ApiGado />;
  }
  else{
  return (
    <form action = "/apiGado" method="post" className='divInput formgado'  onSubmit={handleSubmit}>
        <button className='btnback' onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} onClick={handleButtonBack}><svg className='svgarrowleft' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><path d="M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z"/></svg></button>
        <input className='inputpage3' type="text" name="inputName" placeholder='NOME'/>
        <input className='inputpage3' type="text" name="inputCabecas" placeholder='CABEÇAS DE GADO'/>
        <input className='inputpage3' type="text" name="inputObs" placeholder='OBSERVAÇÃO'/>
        <input className='inputpage3' type="text" name="inputCity" placeholder='CIDADE' value = {cidade} onChange={(e) => setCidade(e.target.value)}/>
        <div class='dates'>
          <input className='inputpage3' type="text" name="inputDateInicial" placeholder="DD/MM HH" value = {dateEntrada} onChange={(e) => setDateEntrada(e.target.value)} />
          <div class='date_between'></div>
          <input className='inputpage3' type="text" name="inputDateFinal" placeholder="DD/MM HH" value = {dateSaida} onChange={(e) => setDateSaida(e.target.value)}/>
        </div>
        <button className='btnaddproduto' type='submit'  onMouseDown={handleMouseClickIn}
            onMouseUp={handleMouseClickOut} onClick={handleButtonForward}>SUBMIT</button>
        <MenuBar exibirBarraSuperiorRelatorio={exibirBarraSuperiorRelatorio} exibirBarraSuperiorCafe={exibirBarraSuperiorCafe} exibirBarraSuperiorGado={exibirBarraSuperiorGado}/>
    </form>
    );
  }
}

export default Gado;