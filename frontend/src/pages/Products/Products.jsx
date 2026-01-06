import React, { useContext, useState } from 'react';
import "./Products.css";
import { StoreContext } from '../../context/StoreContext';
import ExploreBags from '../../components/ExploreBags/ExploreBags';
import BagItem from '../../components/BagItem/BagItem';

const Products = () => {
  const { bag_list } = useContext(StoreContext);
  const [category, setCategory] = useState("All")

  return (
    <div>
      <ExploreBags category={category} setCategory={setCategory}/>
      <div className='bag-display' id='bag-display'>
          <h2>Our Products</h2>
          <div className="bag-display-list">
              {bag_list.map((item, index) => {
                if(category === "All" || category === item.category) {
                  return <BagItem key={index} id={item._id} name={item.name} mrp={item.mrp} price={item.price} image={item.image}/>
                }
              })}
          </div>
      </div>
    </div>
  )
}

export default Products