import React, { useEffect, useState } from 'react';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import "./Scrolltob.scss";


const Scrolltob = () => {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.pageYOffset === 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    if (isAtTop) {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <button className="opdownToPage" onClick={handleClick}>
        {isAtTop ? <div className=' dinto display'>
        <FaArrowDown /><FaArrowDown />
        </div>  : <div className=' dinto display'><FaArrowUp /><FaArrowUp /></div>}
      </button>
    </div>
  );
};

export default Scrolltob;