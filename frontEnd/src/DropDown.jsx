import dropDown from './style/dropDown.css'
import { useState } from "react";
function DropDown() {
  
    return (
        <div>
        <select id="city">
          <option disabled>Temperatura (C°)</option>
          <option disabled>Umidade (%)</option>
          <option disabled>Velocidade do Vento</option>
          <option disabled>Belo Horizonte</option>
        </select>
      </div>
    );
}

export default DropDown;
