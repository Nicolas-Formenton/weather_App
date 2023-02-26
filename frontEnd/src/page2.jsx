import { useState, useEffect } from 'react';
import page2 from './style/page2.css'
import Page3 from './page3'

function Page2() {
    //EFEITO CLICK PRODUTOS
    const handleMouseClickIn = () => {
        const btnopcao = document.querySelector(".efeitoClick")
        btnopcao.style.transform = "translateY(3px)";
      };
    
      const handleMouseClickOut = () => {
        const btnopcao = document.querySelector(".efeitoClick")
        btnopcao.style.transform = "translateY(0px)";
      };

    //EFEITO CLICK MUDAS
      const handleMouseClickIn2 = () => {
        const btnopcao2 = document.querySelector(".efeitoClick2")
        btnopcao2.style.transform = "translateY(3px)";
      };
    
      const handleMouseClickOut2 = () => {
        const btnopcao2 = document.querySelector(".efeitoClick2")
        btnopcao2.style.transform = "translateY(0px)";
      };

      //EFEITO CLICK PLANTIO

      const handleMouseClickIn3 = () => {
        const btnopcao3 = document.querySelector(".efeitoClick3")
        btnopcao3.style.transform = "translateY(3px)";
      };
    
      const handleMouseClickOut3 = () => {
        const btnopcao3 = document.querySelector(".efeitoClick3")
        btnopcao3.style.transform = "translateY(0px)";
      };

      //EFEITO CLICK COLHEITA
    
      const handleMouseClickIn4 = () => {
        const btnopcao4 = document.querySelector(".efeitoClick4")
        btnopcao4.style.transform = "translateY(3px)";
      };
    
      const handleMouseClickOut4 = () => {
        const btnopcao4 = document.querySelector(".efeitoClick4")
        btnopcao4.style.transform = "translateY(0px)";
      };

      //Ativação e desativação da pagina1
  const [active, setActive] = useState(true);

  const handleButtonActiveProdutos = () => {
    setActive(false);
  }

  if (!active) {
    return <Page3 />;
  }


    return (
    <div className='btnlista'>
        <button className='btnopcao efeitoClick' onMouseDown={handleMouseClickIn}
            onMouseUp={handleMouseClickOut} onClick={handleButtonActiveProdutos}>PRODUTOS</button>
        <button className='btnopcao efeitoClick2' onMouseDown={handleMouseClickIn2}
            onMouseUp={handleMouseClickOut2}> MUDAS</button>
        <button className='btnopcao efeitoClick3' onMouseDown={handleMouseClickIn3}
            onMouseUp={handleMouseClickOut3}>PLANTIO</button>
        <button className='btnopcao efeitoClick4' onMouseDown={handleMouseClickIn4}
            onMouseUp={handleMouseClickOut4}>COLHEITA</button>
    </div>
    );
}

export default Page2;