import React, { Suspense } from 'react';
import './BagDisplay.css';
import SkeletonList from '../LazyLoadComponents/SkeletonList/SkeletonList';

// Lazy load
const BagItem = React.lazy(() => import('../BagItem/BagItem'));

const BagDisplay = ({ category, bagList }) => {

  const filteredList = bagList.filter(
    item => category === "All" || category === item.category
  );

  return (
    <div className='bag-display' id='bag-display'>
      <h2>Top Products</h2>

      <div className="bag-display-list">
        <Suspense fallback={<SkeletonList count={8} />}>
          {filteredList.map((item) => (
            <BagItem
              key={item._id}
              id={item._id}
              name={item.name}
              mrp={item.mrp}
              price={item.price}
              image={item.image}
            />
          ))}
        </Suspense>
      </div>
    </div>
  );
};

export default BagDisplay;
