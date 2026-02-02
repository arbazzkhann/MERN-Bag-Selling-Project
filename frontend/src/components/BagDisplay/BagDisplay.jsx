import React, { Suspense, useContext } from 'react'
import './BagDisplay.css'
import { StoreContext } from '../../context/StoreContext'
import BagItemSkeleton from '../LazyLoadComponents/BagItemsSkeleton/BagItemSkeleton';

//Lazy laod
const BagItem = React.lazy(() => import('../BagItem/BagItem'));

const BagDisplay = ({category, bagList}) => {
  return (
    <div className='bag-display' id='bag-display'>
        <h2>Top Products</h2>
        <div className="bag-display-list">
            {bagList.map((item, index) => {
              if(category === "All" || category === item.category) {
                return (
                  <Suspense fallback={<BagItemSkeleton/>}>
                    <BagItem key={index} id={item._id} name={item.name} mrp={item.mrp} price={item.price} image={item.image}/>
                  </Suspense>
                );
              }
            })}
        </div>
    </div>
  );
}

export default BagDisplay