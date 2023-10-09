import React, { useEffect, useState } from 'react'
import { CardGroup } from 'react-bootstrap';
import { useFirebase } from '../context/Firebase'
import CardPage from '../components/Card';

function HomePage() {

    const firebase = useFirebase();
    const [books ,setBooks] =useState([]);

    useEffect(()=>{
        // console.log(docs.docs[0].data())
        firebase.listAllBooks().then((books)=>setBooks(books.docs));
    },[]) 


  return (
    <div className='container mt-5'>
        <CardGroup>

        {books.map((book)=>(
            <CardPage link ={`/book/view/${book.id}`} key={book.id} id={book.id}{...book.data()}/>
        ))}
      


        </CardGroup>
       
        
        
    </div>
  )
}

export default HomePage