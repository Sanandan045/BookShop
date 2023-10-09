import React, { useState } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useFirebase } from '../context/Firebase';
import {Link, useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyNavbar() {

  const [show,setShow]= useState(false);
  const firebase = useFirebase();
  const navigate =useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const loggOut = ()=>{
    firebase.handleLogout();
    handleClose()
    navigate ('/');

  }


  return (
    <div style={{marginBottom:"4rem"}}>

   <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Do You Want to LogOut?</Modal.Title>
        </Modal.Header>
      
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={loggOut}>
          <Link style={{ textDecoration: "none", color: "white" }} to="/" >Log out</Link>
            
          </Button>
        </Modal.Footer>
     </Modal>

  <Navbar bg="dark" data-bs-theme="dark">
    <Container>
      <Navbar.Brand href="/">Bookish</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link ><Link style={{ textDecoration: "none", color: "rgb(207, 207, 207)" }} to="/"><h6>Home</h6></Link></Nav.Link>
          <Nav.Link > <Link style={{ textDecoration: "none", color: "rgb(207, 207, 207)" }} to="/book/list">Add Listing</Link></Nav.Link>
          <Nav.Link > <Link style={{ textDecoration: "none", color: "rgb(207, 207, 207)" }} to="/book/orders">Orders</Link></Nav.Link>

       </Nav>
       {
         firebase.isLoggedIn ? <Nav.Link onClick={handleShow} ><Link style={{ textDecoration: "none", color: "white" }} >Hi,{firebase.user.displayName ? firebase.user.displayName.split(" ")[0] : "user"}</Link></Nav.Link> :

         <>
         <Nav.Link><Link style={{ textDecoration: "none", color: "white" }} to="/login" >login</Link></Nav.Link>
         <Nav.Link><Link style={{ textDecoration: "none", color: "rgb(207, 207, 207)", margin: "5px" }} >/</Link></Nav.Link>
         <Nav.Link><Link style={{ textDecoration: "none", color: "white" }} to="/register" >signup</Link></Nav.Link>
       </>


       }
    </Container>
  </Navbar>
    



  </div>
    
    
  )
}

export default MyNavbar