
import page1 from "./style/page1.css";
import React, { useState } from 'react';
import { useSpring } from 'react-spring';

import Form from './Form';
import Page2 from "./page2";

function Page1() {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseClickIn = () => {
    const buttonArrow = document.querySelector(".nextstep");
    buttonArrow.style.transform = "translateY(3px)";
  };

  const handleMouseClickOut = () => {
    const buttonArrow = document.querySelector(".nextstep");
    buttonArrow.style.transform = "translateY(0px)";
  };

  const handleMouseEnter = () => {
    setIsHovering(true);
    const arrowIcon = document.querySelector(".arrowRight");
    arrowIcon.style.transform = "translateX(10px)";
    arrowIcon.style.strokeWidth = "40px";
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    const arrowIcon = document.querySelector(".arrowRight");
    arrowIcon.style.transform = "none";
    arrowIcon.style.strokeWidth = "10px";
  };

  //PAGINA 1 ESCONDIDA

  window.onload = function () {
    const pagina1 = document.querySelector(".page1");
    setTimeout(() => {
      pagina1.style.display = "flex";
    }, 2000);
  };

  //Ativação e desativação da pagina1
  const [active, setActive] = useState(true);

  const handleButtonActive = () => {
    setActive(false);
  }

  if (!active) {
    return <Page2 />;
  }

  return (

    <div className="page1">
        <h2 className="nameapp">WeatherApp</h2>
        <button
            className="nextstep"
            type="button"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onMouseDown={handleMouseClickIn}
            onMouseUp={handleMouseClickOut}
            onClick={handleButtonActive}>
            <svg
            className="arrowRight"xmlns="http://www.w3.org/2000/svg"height="27"viewBox="0 96 960 960"width="27"><path d="m561 814-43-42 168-168H160v-60h526L517 375l43-42 241 241-240 240Z" /></svg>
        </button>
    </div>

  );
}

export default Page1;
