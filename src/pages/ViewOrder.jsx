import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import  CardPage from '../components/Card';

function ViewOrderPage() {

    const firebase =useFirebase();
    const [books ,setBooks] =useState([]);

    useEffect(() => {
        if (firebase.isLoggedIn)
          firebase
            .fetchMyBooks(firebase.user.uid)
            ?.then((books) => setBooks(books.docs));
      }, [firebase]);
    
      console.log(books);
    
      if (!firebase.isLoggedIn) return <h1>Please log in</h1>;
    



  return (
    <div>
        {books.map((book) => (
        <CardPage
          link={`/books/orders/${book.id}`}
          key={book.id}
          id={book.id}
          {...book.data()}
        />
      ))}
    </div>
  )
}

export default ViewOrderPage