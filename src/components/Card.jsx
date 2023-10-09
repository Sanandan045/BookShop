import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import { useFirebase } from '../context/Firebase';

function CardPage(props) {

    const [url ,setUrl] =useState(null);
    const navigate =useNavigate();
    const firebase = useFirebase();

    useEffect(()=>{
        firebase.getImgURL(props.imageURL).then((url)=>setUrl(url));


    },[])
    


  return (
    <Card style={{ width: '18rem', margin:'25px',marginBottom:"1rem" }}>
      <Card.Img variant="top" src={url} style={{height:"22rem",objectFit:"cover"}} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>
          Title : {props.name} and Author :{props.displayName} and Price :{props.price}
        </Card.Text>
        <Button variant="primary" onClick={e=>navigate(props.link)}>View</Button>
      </Card.Body>
    </Card>
  )
}

export default CardPage;