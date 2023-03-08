import dropDown from './style/dropDown.css'
import { useState } from "react";
function DropDown2() {
  
    const [isOpen2, setIsOpen2] = useState(false);

    const handleDropdownClick2 = () => {
        setIsOpen2(!isOpen2);
      };



    return (

    <div className='divDropDownPai'>
        <div className="dropdown-container">
            <div className="dropdown">
            <button className="dropdown-button" onClick={handleDropdownClick2}>
            Umidade (%)
            </button>
            {isOpen2 && (
                <div className="dropdown-items">
                <a onClick={() => handleItemClick2("Item 4")}>Item 4</a>
                <a onClick={() => handleItemClick2("Item 5")}>Item 5</a>
                <a onClick={() => handleItemClick2("Item 6")}>Item 6</a>
                </div>
            )}
            </div>
        </div>
    </div>
    
    );
  }



export default DropDown2;
