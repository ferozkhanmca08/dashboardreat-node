import React from 'react'
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Nav from './components/Nav';
import Profile from './components/Profile';
import Addprofile from './components/Addproduct';
import Updateproduct from './components/Updateproduct';
import Logout from './components/Logout';
import SignUp from './components/SignUp';
import Footer from './components/Footer';
import PrivateComponent from './components/PrivateComponent';
import Login from './components/Login';
import Productlist from './components/Productlist';
function App() {
  return (
    <div className="App">
      <BrowserRouter>       
        <Nav />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<Productlist />} />
            <Route path="/update/:id" element={<Updateproduct />} />
            <Route path="/add" element={<Addprofile />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
