import React, { useState } from 'react';
import "./Home.css";
import Header from '../../components/Header/Header';
import ExploreBags from '../../components/ExploreBags/ExploreBags';
import BagDisplay from '../../components/BagDisplay/BagDisplay';

const Home = () => {
    const [category, setCategory] = useState("All")

  return (
    <div>
        <Header/>
        <ExploreBags category={category} setCategory={setCategory}/>
        <BagDisplay category={category} setCategory={setCategory}/>
    </div>
  )
}

export default Home