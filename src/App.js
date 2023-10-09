
import {Routes,Route} from "react-router-dom";
//CSS
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

//Components -->
 import MyNavbar from "./components/Navbar";


//Pages--> 

import Register from "./pages/Register";
import LoginPage from "./pages/LoginPage";
import ListPage from "./pages/List";
import HomePage from "./pages/Home";
import BookDetialsPage from "./components/Detials";
import ViewOrderPage from "./pages/ViewOrder";
import ViewOrderDetails from "./pages/ViewOrderDetails";


function App() {
  return (
    <div className="App">
      <MyNavbar/>

      <Routes>
        < Route path="/" element={<HomePage/>}/>
        < Route path="/register" element={<Register/>}/>
        < Route path="/login" element={<LoginPage/>}/>
        < Route path="/book/list" element={<ListPage/>}/>
        < Route path="/book/view/:bookId" element={<BookDetialsPage/>}/>
        < Route path="/book/orders" element={<ViewOrderPage/>}/>
        < Route path="/books/orders/:bookId" element={<ViewOrderDetails/>}/>
      </Routes>

      
    </div>
  );
}

export default App;
