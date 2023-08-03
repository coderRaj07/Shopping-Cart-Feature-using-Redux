import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn,
  MDBContainer,
  MDBCol,
  MDBRow,
} from 'mdb-react-ui-kit';
import { useSelector,useDispatch } from 'react-redux';
import {addToCart} from '../features/cartSlice'

export default function ProductCard() {
    
  const dispatch = useDispatch();  
  const items = useSelector((state) => state.allCart.items);

  // Check if items is an array and not null/undefined
  if (!Array.isArray(items)) {
    return null; 
  }

  // Custom styles for the cards
  const cardStyle = {
    width: '18rem', // Set a fixed width for all cards (you can adjust this as needed)
    margin: '10px', // Add margin between cards
    // overflow: 'hidden',
    // display: '-webkit-box',
    // WebkitLineClamp: 3, // Number of lines to show before truncating
    WebkitBoxOrient: 'vertical',
  };

  return (
    <div className="m-2">
      <MDBContainer>
        <MDBRow className="mb-3">
          {items.map((item) => (
            <MDBCol size="md" key={item.id}>
              <MDBCard style={cardStyle}>
                <MDBCardImage src={item.image} position="top" alt="..." />
                <MDBCardBody>
                  <MDBCardTitle>{item.title}</MDBCardTitle>
                  <MDBCardText>{item.description}</MDBCardText>
                  <MDBBtn onClick={()=>dispatch(addToCart(item))}>Add to Cart</MDBBtn>
                </MDBCardBody>
              </MDBCard>
            </MDBCol>
          ))}
        </MDBRow>
      </MDBContainer>
    </div>
  );
}

