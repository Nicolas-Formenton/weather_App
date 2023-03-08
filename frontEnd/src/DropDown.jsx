import dropDown from './style/dropDown.css'
import { useState } from "react";
function DropDown() {
  
    const [isOpen, setIsOpen] = useState(false);

    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
      };



    return (

    <div className='divDropDownPai'>
        <div className="dropdown-container">
            <div className="dropdown">
            <button className="dropdown-button" onClick={handleDropdownClick}>
                Temperatura (C°)
            </button>
            {isOpen && (
                <div className="dropdown-items">
                <a onClick={() => handleItemClick("Item 1")}>Item 1</a>
                <a onClick={() => handleItemClick("Item 2")}>Item 2</a>
                <a onClick={() => handleItemClick("Item 3")}>Item 3</a>
                </div>
            )}
            </div>
        </div>
    </div>
    
    );
  }



export default DropDown;
