import React from 'react';
import "./ViewMore.css";
import { useNavigate } from 'react-router-dom';

const ViewMore = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        window.scrollTo(0, 0); // scroll to top
        navigate('/products');
    };

  return (
    <div className='button-container'>
        {/* <Link to='/products'><div class="button"><span>View More</span></div></Link> */}
       <div onClick={handleClick} class="button"><span>View More</span></div>
    </div>
  )
}

export default ViewMore