import React from 'react'
import './ExploreBags.css'
import { bag_type_list } from '../../assets/assets'

const ExploreBags = ({category, setCategory, heading}) => {
  return (
    <div className='explore-products' id='explore-products'>
        <h1>{heading}</h1>
        {/* <p className='explore-products-text'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure, beatae similique atque debitis quo autem reiciendis amet repudiandae labore? Non.</p> */}
        <div className="explore-products-list">
            {bag_type_list.map((item, index) => {
                return (
                    <div onClick={() => setCategory(prev => prev === item.type ? "All" : item.type)} className='explore-products-list-item' key={index}>
                        <img className={category === item.type ? "active" : ""} src={item.type_image} alt="" />
                        <p>{item.type}</p>
                    </div>
                );
            })}
        </div>
        <hr />
    </div>
  )
}

export default ExploreBags