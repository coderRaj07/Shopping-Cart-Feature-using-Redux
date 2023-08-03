import './App.css'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import {useDispatch} from 'react-redux';
import {getAllData} from './features/cartSlice';
import React, { useEffect } from 'react';

function App() {

  const dispatch = useDispatch();

  // Dispatch the action when the component mounts (page loads)
  // So that we can display data in subsequent components using useSelector()
  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]); 

  return (
      <div>
        <Navbar/>
        <ProductCard/>
      </div>
  )
}

export default App