import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useFirebase } from '../context/Firebase';

function ListPage() {

    const firebase = useFirebase();

    const [name ,setName] =useState('');
    const [isbnNumber ,setIsbnNumber] =useState('');
    const [price ,setPrice] =useState('');
    const [coverPic,setCoverPic] =useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
  
          await firebase.handleCreateNewListing(
          name,
          isbnNumber,
          price,
          coverPic
        );
     
      };

      if (!firebase.isLoggedIn) return <h1 className='container' >Please login to list your books</h1>


  return (
    <div className='container mt-5'>
         <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Enter A Book Name</Form.Label>
        <Form.Control onChange={(e)=>setName(e.target.value)} value={name} type="text" placeholder="Enter book name"  />
        
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            onChange={(e) => setIsbnNumber(e.target.value)}
            value={isbnNumber}
            type="text"
            placeholder="ISBN Number"
          />
        </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Enter Book of Price</Form.Label>
        <Form.Control  onChange={(e)=>setPrice(e.target.value)} value={price} type="text" placeholder="Price"  />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Browse me</Form.Label>
        <Form.Control  onChange={(e)=>setCoverPic(e.target.files[0])}  type="file"   />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Create
      </Button>
    </Form>

    </div>
  )
}

export default ListPage