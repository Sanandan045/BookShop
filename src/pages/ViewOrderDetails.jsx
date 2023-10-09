import React, { useEffect, useState } from 'react'
import { useFirebase } from '../context/Firebase'
import { useParams } from 'react-router-dom';

function ViewOrderDetails() {

    const params = useParams();
    const firebase = useFirebase();
    const [orders,setOrders] =useState([]);

    useEffect(() => {
        firebase.getOrders(params.bookId).then((orders) => setOrders(orders.docs));
      }, []);

      if(orders.length===0) return <h2 className='container mt-3' >There is no order for this book</h2>


  return (
    <div className="container mt-3">
      <h1>Orders</h1>
      {orders.map((order) => {
        const data = order.data();
        return (
          <div
            key={order.id}
            className="mt-5"
            style={{ border: "1px solid", padding: "10px" }}
          >
            <h5>Order By: {data.displayName}</h5>
            <h6>Qty: {data.qty}</h6>
            <p>Email: {data.userEmail}</p>
          </div>
        );
      })}
    </div>
  )
}

export default ViewOrderDetails