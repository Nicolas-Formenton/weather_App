import './style/dropDown.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
function DropDown3() {
  
    const [isOpen3, setIsOpen3] = useState(false);
    const [data, setData] = useState('');

    
    const handleDropdownClick3 = () => {
        setIsOpen3(!isOpen3);
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
                <button className="dropdown-button" onClick={handleDropdownClick3}>
                Probabilidade de Chuva (%)
                </button>
                {isOpen3 && (
                    <div className="dropdown-items">
                    <a onClick={() => handleItemClick3("Item")}>Item</a>
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
                        <button className="dropdown-button" onClick={handleDropdownClick3}>
                        Probabilidade de Chuva ({data.data.values.precipitationProbability} %)
                        </button>
                        {isOpen3 && (
                        <div className="dropdown-items">
                            <a onClick={() => handleItemClick3("Item")}>Item</a>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
        );
    }
}



export default DropDown3;
