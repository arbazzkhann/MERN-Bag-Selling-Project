import React, { useContext, useState } from 'react'
import "./BagItem.css"
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';

const BagItem = ({id, name, mrp, price, image}) => {
  const {cartItems, setCartItems, addToCart, removeFromCart, url } = useContext(StoreContext);
  // const [expanded, setExpanded] = useState(false);
  // const lines = 3;

  return (
    <div className='bag-list'>
      <div className='bag-item'>
        <div className="bag-item-image-container">
          <img className='bag-item-image' src={`${url}/images/${image}`} alt=""/>
          {!cartItems[id]
            ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white}/>
            : <div className='bag-item-counter'>
                <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                <p>{cartItems[id]}</p>
                <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
              </div>
          }
        </div>
        <div>
          <div className="bag-item-info">
            <div className="bag-item-name-rating">
              <p>{name}</p>
              <img src={assets.rating_starts} alt=""/>
            </div>
            {/* <p 
              className={`bag-item-description description ${expanded ? "expanded" : ""}`} 
              style={{ WebkitLineClamp: expanded ? "unset" : lines }}
            >
              {description}
            </p> */}
            {/* <button
              className="read-more-btn"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "See less" : "See more"}
            </button> */}

            <p className="bag-item-mrp">₹{mrp}</p>
            <p className="bag-item-price">₹{price}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BagItem