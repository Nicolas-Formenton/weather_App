import './style/dropDown.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
function DropDown() {
  
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState('');

    
    const handleDropdownClick = () => {
        setIsOpen(!isOpen);
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
                <button className="dropdown-button" onClick={handleDropdownClick}>
                Temperatura (C°)
                </button>
                {isOpen && (
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
                {data.map((timeline, timelineIndex) => (
                    <div key={timelineIndex}>
                    {timeline.intervals.map((interval, intervalIndex) => {
                        return (
                        <div className="dropdown" key={intervalIndex}>
                            <button className="dropdown-button" onClick={handleDropdownClick}>
                            Temperatura ({interval.values.temperature} C°)
                            </button>
                            {isOpen && (
                            <div className="dropdown-items">
                                <a onClick={() => handleItemClick("Item")}>Item</a>
                            </div>
                            )}
                        </div>
                        );
                    })}
                    </div>
                ))}
                </div>
            </div>
            );
    }
}



export default DropDown;
