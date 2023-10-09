import React, { useState ,useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { useFirebase } from '../context/Firebase';
import { useNavigate } from 'react-router-dom';

function Register() {

    const firebase =useFirebase();
    const [email,setEmail] = useState('');

    const [password,setPassword] = useState('');

    const navigate = useNavigate();

    //when user is logIn then rederect to home page -->

    useEffect(()=>{
      if(firebase.isLoggedIn){
        navigate('/')
      }
    },[firebase,navigate]);

      // sign up user when submit button is clicked -->

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Signin up a user...");
        const result = await firebase.signupUserWithEmailAndPassword(
          email,
          password
        );
        console.log("Successfull", result);
      };



  return (
    <div className='container mt-5'>
         <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control onChange={(e)=>setEmail(e.target.value)} value={email} type="email" placeholder="Enter email"  />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control  onChange={(e)=>setPassword(e.target.value)} value={password} type="password" placeholder="Password"  />
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Create a Account 
      </Button>
    </Form>

    </div>
  )
}

export default Register