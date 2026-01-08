import React from 'react'
import './ExploreBags.css'
import { bag_type_list } from '../../assets/assets'

const ExploreBags = ({category, setCategory, heading}) => {
  return (
    <div className="explore-products-list-wrapper">
        <div className="explore-products-list">
            {bag_type_list.map((item, index) => (
                <div 
                    onClick={() => setCategory(prev => prev === item.type ? "All" : item.type)} 
                    className='explore-products-list-item' 
                    key={index}
                >
                    <img className={category === item.type ? "active" : ""} src={item.type_image} alt="" />
                    <p>{item.type}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default ExploreBags