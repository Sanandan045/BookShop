import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from "react-bootstrap/Form";
import {Link, useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import { Badge,  Modal, Spinner } from 'react-bootstrap'

function BookDetialsPage() {
    const params = useParams();
    const firebase = useFirebase();
    const [data ,setData] =useState(null);
    const [url ,setURL] =useState(null);
    const [qty,setQty] =useState(1);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log(data);

    useEffect(() => {
        firebase.getBookById(params.bookId).then((value) => setData(value.data()));
      }, []);

      useEffect(() => {
        if (data) {
          const imageURL = data.imageURL;
          firebase.getImgURL(imageURL).then((url) => setURL(url));
        }
      }, [data]);


      const placeOrder = async () => {
        const result = await firebase.placeOrder(params.bookId, qty);
        console.log("Order Placed", result);
        handleShow();
      };

    if(data ==null){
        return ( <div className="container" style={{ height: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Spinner style={{ height: "6rem", width: "6rem" }} animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
        </Spinner></div>);
    }



  return (
    <div className="container mt-5">

     <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Order placed</Modal.Title>
                </Modal.Header>
                <Modal.Body>Thank you!! <br /> Your order of {data.name} is successful 🎉</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        <Link style={{ textDecoration: "none", color: "white" }} to="/" >Continue shopping</Link>
                    </Button>
                </Modal.Footer>
            </Modal>



         {/* <h1>{data.name}</h1>
      <img src={url} width="50%" style={{ borderRadius: "10px" }} />
      <h1>Details</h1>
      <p>Price: Rs. {data.price}</p>
      <p>ISBN Number. {data.isbn}</p>
      <h1>Owner Details</h1>
      <p>Name: {data.displayName}</p>
      <p>Email: {data.userEmail}</p>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Qty</Form.Label>
        <Form.Control
          onChange={(e) => setQty(e.target.value)}
          value={qty}
          type="Number"
          placeholder="Enter Qty"
        />
      </Form.Group>


      <Button onClick={placeOrder} variant="success">Success</Button> */}

<h2>{data.name}</h2>
            <img src={url ? url : "https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif?20151024034921"} style={{ height: "24rem", width: "16rem", objectFit: "cover", borderRadius: "0.5rem" }} alt="" />
            <h4 className="mt-5" >Details</h4>
            <p style={{ fontSize: "1.2rem" }} >Price - <Badge bg="success">Rs.{data.price}</Badge></p>
            <p style={{ fontSize: "1.2rem" }} >ISBN - <Badge bg="secondary">{data.isbn}</Badge></p>
            <input style={{ display: "block", width: "4rem" }} value={qty} onChange={e => setQty(e.target.value)} type="number" />
            <Button onClick={placeOrder} variant='warning mt-2' >Buy now</Button>
            <h4 className='mt-3' >Owner details</h4>
            <div style={{ display: "flex", alignItems: "center" }}>
                <img style={{ borderRadius: "50%", height: "5rem", marginRight: "7px" }} src={data.photoURL} alt="" />
                <div>
                    <p>{data.displayName}</p>
                    <p>{data.userEmail}</p>
                </div>
            </div>
    </div>
  )
}

export default BookDetialsPage;