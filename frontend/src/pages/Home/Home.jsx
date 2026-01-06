import React, { useContext, useState } from 'react';
import "./Home.css";
import Header from '../../components/Header/Header';
import BagDisplay from '../../components/BagDisplay/BagDisplay';
import ViewMore from '../../components/ViewMore/ViewMore';
import { StoreContext } from '../../context/StoreContext';

const Home = () => {
    const [category, setCategory] = useState("All");
    const { topBagList } = useContext(StoreContext);
    
  return (
    <div>
        <Header/>
        <BagDisplay category={category} setCategory={setCategory} bagList={topBagList}/>
        <ViewMore/>
    </div>
  )
}

export default Home