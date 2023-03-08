import dropDown from './style/dropDown.css'
import { useState } from "react";
function DropDown3() {
  
    const [isOpen3, setIsOpen3] = useState(false);

    const handleDropdownClick3 = () => {
        setIsOpen3(!isOpen3);
      };



    return (

    <div className='divDropDownPai'>
        <div className="dropdown-container">
            <div className="dropdown">
            <button className="dropdown-button" onClick={handleDropdownClick3}>
            Velocidade do vento (KM/h)
            </button>
            {isOpen3 && (
                <div className="dropdown-items">
                <a onClick={() => handleItemClick3("Item 7")}>Item 7</a>
                <a onClick={() => handleItemClick3("Item 8")}>Item 8</a>
                <a onClick={() => handleItemClick3("Item 9")}>Item 9</a>
                </div>
            )}
            </div>
        </div>
    </div>
    
    );
  }



export default DropDown3;