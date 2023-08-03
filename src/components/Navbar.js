import React,{useEffect} from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBBtn,
  MDBInputGroup
} from 'mdb-react-ui-kit';
import {useDispatch,useSelector} from 'react-redux';
import {getAllData,getCartTotal} from '../features/cartSlice';

import { Link } from 'react-router-dom';

export default function App() {
  const dispatch = useDispatch();

  const {cart,totalQuantity} = useSelector((state)=>state.allCart)

  useEffect(()=>{dispatch(getCartTotal())},[dispatch,cart])

  return (
    <MDBNavbar light bgColor='light'>
      <MDBContainer fluid>
      
          <MDBNavbarBrand>Navbar</MDBNavbarBrand>
          <span>
            <Link to="/">
            All Product
            </Link>
          </span>
          <MDBBtn color='light' onClick={()=>dispatch(getAllData())}>
            <Link to="/cart">
              Cart({totalQuantity})
            </Link>
          </MDBBtn>
     

        <MDBInputGroup tag="form" className='d-flex w-auto mb-3'>
          <input className='form-control' placeholder="Type query" aria-label="Search" type='Search' />
          <MDBBtn outline>Search</MDBBtn>
        </MDBInputGroup>
      </MDBContainer>
    </MDBNavbar>
  );
}