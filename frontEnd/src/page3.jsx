import { useState, useEffect } from 'react';
import page3 from './style/page3.css';
import Page2 from './page2';
import { format } from 'date-fns';
import Page3_2 from './Page3_2';

function Page3() {


  const [cidade, setCidade] = useState('');
  const [dateEntrada, setDateEntrada] = useState('');
  const [dateSaida, setDateSaida] = useState('');
  const [timesteps, setTimesteps] = useState('');

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

      const handleSubmit = (e) => {
        e.preventDefault();

        // loop p ver no console o que está saindo do submit
        const formData = new FormData(e.target);
        const data = {};
        for (let [key, value] of formData.entries()) {
          data[key] = value;
        }
        console.log(JSON.stringify(data));

        fetch('http://127.0.0.1:5000/previsao', {
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

        return <Page3_2 />
      };

 //Ativação e desativação das paginas
 const [destination, setDestination] = useState("");

 const handleButtonBack = () => {
   setDestination("back");
 };


  if (destination === "back") {
   return <Page2 />;
 }else{
  return (
    <form action = "/previsao" method="post" className='divInput'  onSubmit={handleSubmit}>
        <button className='btnback' onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} onClick={handleButtonBack}><svg className='svgarrowleft' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><path d="M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z"/></svg></button>
        <input className='inputpage3' type="text" name="inputName" placeholder='Nome'/>
        <input className='inputpage3' type="text" name="inputQuantidade" placeholder='Quantidade'/>
        <input className='inputpage3' type="text" name="inputDosagem" placeholder='Dosagem'/>
        <input className='inputpage3' type="number"  step="0.01" pattern="[0-9]+([,.][0-9]+)?" name="inputPreco" placeholder='Preço'/>
        <input className='inputpage3' type="text" name="inputCity" placeholder='Cidade' value = {cidade} onChange={(e) => setCidade(e.target.value)}/>
        <input className='inputpage3' type="text" name="inputDateInicial" placeholder="dd/mm hh" value = {dateEntrada} onChange={(e) => setDateEntrada(e.target.value)} />
        <input className='inputpage3' type="text" name="inputDateFinal" placeholder="dd/mm hh" value = {dateSaida} onChange={(e) => setDateSaida(e.target.value)} />

        <label htmlfor="timesteps">Timesteps:</label>
        
        <div className='ajusteradio' value = {timesteps}>
            <br/>
            <input type="radio" id="1h" name="timesteps" value="1h" onChange={(e) => setTimesteps(e.target.value)} />
            <label hmtlfor="1h">1 Hour</label>
            <br/>
            <input type="radio" id="1d" name="timesteps" value="1d" onChange={(e) => setTimesteps(e.target.value)}/>
            <label hmtlfor="1d">1 Day</label>
          </div>
        <button className='btnaddproduto' type='submit'  onMouseDown={handleMouseClickIn}
            onMouseUp={handleMouseClickOut}>Submit</button>
    </form>
    );
 }

}

export default Page3;