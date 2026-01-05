import React, { useContext } from 'react'
import './BagDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import BagItem from '../BagItem/BagItem'

const BagDisplay = ({category}) => {
    const { bag_list } = useContext(StoreContext)

  return (
    <div className='bag-display' id='bag-display'>
        <h2>Top Products</h2>
        <div className="bag-display-list">
            {bag_list.map((item, index) => {
              if(category === "All" || category === item.category) {
                return <BagItem key={index} id={item._id} name={item.name} mrp={item.mrp} price={item.price} image={item.image}/>
              }
            })}
        </div>
    </div>
  );
}

export default BagDisplay