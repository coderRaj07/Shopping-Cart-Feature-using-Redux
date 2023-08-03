import './App.css'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import CartPage from './components/cartPage'
import { useDispatch } from 'react-redux';
import { getAllData } from './features/cartSlice';
import React, { useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

function App() {

  const dispatch = useDispatch();
  // Dispatch the action when the component mounts (page loads)
  // So that we can display data in subsequent components using useSelector()
  useEffect(() => {
    dispatch(getAllData());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<ProductCard/>}/>
          <Route path="/cart" element={<CartPage/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App