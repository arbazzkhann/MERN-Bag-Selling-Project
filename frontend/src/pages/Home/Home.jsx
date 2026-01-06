import React, { useState } from 'react';
import "./Home.css";
import Header from '../../components/Header/Header';
import ExploreBags from '../../components/ExploreBags/ExploreBags';
import BagDisplay from '../../components/BagDisplay/BagDisplay';
import ViewMore from '../../components/ViewMore/ViewMore';

const Home = () => {
    const [category, setCategory] = useState("All")
    
  return (
    <div>
        <Header/>
        <BagDisplay category={category} setCategory={setCategory}/>
        <ViewMore/>
    </div>
  )
}

export default Home