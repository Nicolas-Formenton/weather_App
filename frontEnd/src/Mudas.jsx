import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Page2 from './page2';
import mudas from './style/mudas.css'

function Mudas() {
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
<div className='ajustebtnback'>
<button className='btnback' onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} onClick = {handleButtonPage2}><svg className='svgarrowleft' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><path d="M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z"/></svg></button>
Colheita em Manutenção <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" clip-rule="evenodd"><path d="M1.992 6.448c.337-.668.898-1.783 1.227-2.448.13-.261.378-.415.669-.441 1.367-.125 4.243-.339 5.429-.417.547-.036.951.045 1.301.397l2.786 2.8c.251.252.392.593.391.948l-.005 9.035 2.946 2.465 2.719-2.996c.591-.65 1.662-.435 1.942.399.938 2.817 2.603 7.81 2.603 7.81h-12l4.063-4.472-6.059-5.071-1.749-1.464 1.96 3.557c.104.188.164.396.178.608l.396 6.045c.022.354-.223.797-.787.797-.368 0-.687-.253-.77-.611-.309-1.323-1.025-4.399-1.206-5.178-.028-.12-.087-.229-.17-.319-.549-.591-2.738-2.892-2.738-2.892s-2.804 6.666-3.561 8.525c-.113.277-.374.475-.748.475-.462 0-.809-.382-.809-.803 0-.146 1.745-8.569 2.322-11.638.07-.371.239-.717.49-1l1.08-1.217-3.503-2.932c-.507-.425.137-1.192.642-.767l.961.805zm6.854 5.735l1.8 1.507 1.952 1.634-1.061-5.948-2.691 2.807zm-5.961-4.988l1.671 1.398 2.791-3.146-2.73-.183-1.732 1.931zm11.653-7.195c1.35 0 2.446 1.096 2.446 2.446s-1.096 2.445-2.446 2.445c-1.349 0-2.446-1.095-2.446-2.445 0-1.35 1.097-2.446 2.446-2.446z"/></svg>
</div>
);
}

export default Mudas;