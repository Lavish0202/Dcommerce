import React from 'react';
import {Link} from 'react-router-dom';
import './App.css';


//Simple functiona class to navigate our project through navigation links...
export default function LinkTabs() {
    
       const navStyle = {
            color:'white'
        };
   
    return (
        <div className="App">
    {/*-- Component for diplaying Shop and Add Product */}
    <nav> 
        <ul className="nav-links">
            <Link to="/Buy">
                <li style = {navStyle}><h3>Shop</h3></li>
            </Link> 
            <Link to="/Add">
                <li style = {navStyle}><h3>Add Product</h3></li>
            </Link> 
        </ul>
    </nav>
    </div>
    )
}
