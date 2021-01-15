import React, { Component } from 'react'

export default class Navbar extends Component {
    render() {
        return ( 
            <nav className="navbar navbar-dark bg-dark fixed-top flex-md-nowrap p-0 shadow">
              <a
                className="navbar-brand col-sm-3 col-md-2 mr-0"
                target="_blank"
               href="http://localhost:3000/"
                rel="noopener noreferrer"
              > <div class = "text-center">
                   <h2 text-align = "center">D-commerce</h2>
              </div>
               
              </a>
             <ul className="navbar-nav px-3">
                 <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                    <small className="badge badge-dark"><span>Account: {this.props.account}</span></small>
                 </li>
             </ul>
            </nav>
             );
        }
}
