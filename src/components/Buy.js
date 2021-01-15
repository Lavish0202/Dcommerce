import React, { Component } from 'react'

export default class Buy extends Component {
    render() {
        return (
          <div id="content">
          <h2>Buy Product</h2>
          {/*-- Table creation for addition of products */}
          <table  className="table bgg" >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Owner</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody id="productList">
              {
                this.props.products.map((product,key)=>{
                  return(
                  <tr key={key}>
                    <th scope="row">{product.id.toString()}</th>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{window.web3.utils.fromWei(product.price.toString(),'Ether')} Eth</td>
                    <td>{product.owner}</td>
                  <td>
                    { 
                      //if product is not purchased then only a buyer can but the product
                      !product.purchased
                        ? <button className="button"
                            name={product.id}
                            desc={product.description}
                            value={product.price}
                            onClick={(event) => {
                              //seting the props to display on the screen
                              this.props.purchaseProduct(event.target.name, event.target.desc,event.target.value)
                            }}
                            >
                            Buy
                          </button>
                      : null
                   }
                  </td>
                  </tr>)
                })
              }
              
              
            </tbody>
          </table>
        </div>
        )
    }
}
 