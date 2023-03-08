import './style/dropDown.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
function DropDown2() {
  
    const [isOpen2, setIsOpen2] = useState(false);
    const [data, setData] = useState('');

    
    const handleDropdownClick2 = () => {
        setIsOpen2(!isOpen2);
    };
    
    useEffect(() => {
      axios.get('http://127.0.0.1:5000/apiRealtime')
        .then(response => {
          setData(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    }, []);

    if(!data){
        return (
        <div className='divDropDownPai'>
            <div className="dropdown-container">
                <div className="dropdown">
                <button className="dropdown-button" onClick={handleDropdownClick2}>
                Umidade (%)
                </button>
                {isOpen2 && (
                    <div className="dropdown-items">
                    <a onClick={() => handleItemClick2("Item")}>Item</a>
                    </div>
                )}
                </div>
            </div>
        </div>
        );
    }
    else{
        return (
        <div className='divDropDownPai'>
            <div className="dropdown-container">
                <div>
                    <div className="dropdown">
                        <button className="dropdown-button" onClick={handleDropdownClick2}>
                        Umidade ({data.data.values.humidity} %)
                        </button>
                            {isOpen2 && (
                            <div className="dropdown-items">
                                <a onClick={() => handleItemClick2("Item")}>Item</a>
                            </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
        );
    }
}



export default DropDown2;
