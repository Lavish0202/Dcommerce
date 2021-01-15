import React from 'react'

export default function About() {
    return (
        //Component for displaying the description about the app.
        <div className="text-color">
            <p>D-commerce implements a peer-to-peer network which offers transaction, coordination and collaboration based on distributed node systems,
                by means of data encryption, time stamping, and consensus. It presents simulation to possible solution to the problems of insecure data storage that are common in centralized system.
                In this project we have created Ethereum smart contracts which allows users of an application to be a buyer or a seller using solidity programming language. 
                An ecommerce solution is presented similar to a marketplace without any central organization accessing user data or using any insecure payment methods .
                It allows people to list items on sale, describe the items and it allows other people to purchase these items with cryptocurrency (ethereum). 
                Whenever someone purchases the item they become the owner of the product after successful payment transfer.</p>

                <h4 align="center">To buy the product and see the available items click on the Shop tag</h4>
                <h4 align="center"> To list the item as the seller click on the Add item tag</h4>
        </div>
    )
}
