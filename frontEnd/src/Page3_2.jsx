import { useState, useEffect } from 'react';
import page3_2 from './style/page3_2.css';
import { format } from 'date-fns';
import Page3 from './page3';

function Page3_2() {

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

        const handleButtonPage3_2 = () => {
        setDestination("Page3_2");
        };

        const handleButtonBack = () => {
        setDestination("back");
        };


        if (destination === "Page3_2") {
        return <Page3_2 />;
        } else if (destination === "back") {
        return <Page3 />;
        } 

    return (
   <div className='ajustebtnback'>
        <button className='btnback' onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} onClick = {handleButtonBack}><svg className='svgarrowleft' viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg"><title/><path d="M10.1,23a1,1,0,0,0,0-1.41L5.5,17H29.05a1,1,0,0,0,0-2H5.53l4.57-4.57A1,1,0,0,0,8.68,9L2.32,15.37a.9.9,0,0,0,0,1.27L8.68,23A1,1,0,0,0,10.1,23Z"/></svg>
        </button>
</div>
    );
}

export default Page3_2;