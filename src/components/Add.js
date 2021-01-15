import React, { Component } from 'react'
import './App.css';

export default class Buy extends Component {
    render() {
        return (
            <div id="content">
               <h1>Add Product...</h1>
              
          <form onSubmit={(event) => {
            //On submission of form we will get the input values from user and this will be sent to our blochcain through App.js file
            event.preventDefault()
            const name = this.productName.value
            const description= this.productDescription.value
            const price = window.web3.utils.toWei(this.productPrice.value.toString(), 'Ether')
            //Setting the values in createProduct function
            this.props.createProduct(name,description, price)
          }}>
            <div className="form-group mr-sm-2">
              <input
                id="productName"
                type="text"
                ref={(input) => { this.productName = input }}
                className="form-control"
                placeholder="Product Name"
                autoComplete="off"
                required />
            </div>
            <div className="form-group mr-sm-2">
              <input
                id="productDesc"
                type="text"
                ref={(input) => { this.productDescription = input }}
                className="form-control"
                autoComplete="off"
                placeholder="Product Description (Used/ New)"
                required />
            </div>
            <div className="form-group mr-sm-2">
              <input
                id="productPrice"
                type="text"
                ref={(input) => { this.productPrice = input }}
                className="form-control"
                autoComplete="off"
                placeholder="Product Price in eth"
                required />
            </div>
            <button type="submit" className="button">Add Product</button>
          </form>
            </div>
        )
    }
}
