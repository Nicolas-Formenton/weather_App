import { useState, useEffect } from 'react';
import page3 from './style/page3.css'
import Page2 from './page2';


function Page3() {
  const [isHovering, setIsHovering] = useState(false);

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
        setIsHovering(true);
        const arrowIcon = document.querySelector(".svgarrowleft");
        arrowIcon.style.transform = "translateX(-5px)";
        arrowIcon.style.strokeWidth = "1px";
      };
    
      const handleMouseLeave = () => {
        setIsHovering(false);
        const arrowIcon = document.querySelector(".svgarrowleft");
        arrowIcon.style.transform = "none";
        arrowIcon.style.strokeWidth = "0px";
      };

  //Ativação e desativação da pagina2
  const [active, setActive] = useState(true);

  const handleButtonPage2 = () => {
    setActive(false);
  }

  if (!active) {
    return <Page2 />;
  }

    return (
    <div className='divInput'>
        <button className='btnback' onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave} onClick={handleButtonPage2}><svg className='svgarrowleft' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><path d="M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z"/></svg></button>
        <input className='inputpage3' type="text" name="inputName" placeholder='Nome'/>
        <input className='inputpage3' type="text" name="inputQuantidade" placeholder='Quantidade'/>
        <input className='inputpage3' type="text" name="inputDosagem" placeholder='Dosagem'/>
        <input className='inputpage3' type="number"  step="0.01" pattern="[0-9]+([,.][0-9]+)?" name="inputPreco" placeholder='Preço'/>
        <input className='inputpage3' type="date" name="inputDate" placeholder="Data de Aplicação" />
        <button className='btnaddproduto' type='submit'  onMouseDown={handleMouseClickIn}
            onMouseUp={handleMouseClickOut}>SALVAR</button>
    </div>
    );
}

export default Page3;