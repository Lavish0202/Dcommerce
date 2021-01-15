import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import Marketplace from '../abis/Marketplace.json';
import Navbar from './Navbar';
import Buy from './Buy';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 
import About from './About';
import LinkTabs from './LinkTabs';
import './App.css';
import Add from './Add';



//Main class to connect our blockchain smartcontract using Web3.js to our ReactJs frontend, also helping in communication of data  
class App extends Component {
  async componentDidMount(){
    await this.loadWeb3();
    await this.loadData();
    
  }
  
  
  
  //Connect the blockchain to browser through web3.js. It checks if the browser is compatible or not as well.
      async loadWeb3() {
        
        // Modern dapp browsers...
        if(window.ethereum) {
            window.web3 = new Web3(window.ethereum);
            window.ethereum.enable();
        
            // User has allowed account access to DApp..
        } else if (window.web3) {
          // Legacy DApp Browsers
            var web3 = new Web3();
            window.web3 = new Web3(web3.currentProvider);
      } else {
            // Non-DApp Browsers
          alert("Cannoct connect to network")
        }
    }

    // Loading the blockchain data here
    async loadData() {
      const web3 = window.web3
      // Load account
      const accounts = await web3.eth.getAccounts()
      this.setState({ account: accounts[0] })
      // Getting the network ID and data associated with the net ID
      const networkId = await web3.eth.net.getId()
      const networkData = Marketplace.networks[networkId]
      // If net id is same...
      if(networkData) {
        const marketplace =new web3.eth.Contract(Marketplace.abi, networkData.address)
        this.setState({ marketplace })
        const productCount = await marketplace.methods.productCount().call()
        this.setState({ productCount })
        // Load product Items here for the product count
        for (var i = 1; i <= productCount; i++) {
          const product = await marketplace.methods.products(i).call()
          this.setState({
            products: [...this.state.products, product]
          })
        }
        //console.log(productCount.toString())
        this.setState({ loading: false})
        //console.log(this.state.products)

      }
      // If not detected the same network ID, functions cannot be proccessed 
      else {
        window.alert('Marketplace contract not deployed to detected network.')
      }
    }
    //props to set the product array with also binding the methods for front end 
    constructor(props){
      super(props)
      this.state={
        account: '',
        productCount: 0,
        products:[],
        loading: true
      }
      this.createProduct = this.createProduct.bind(this);
      this.purchaseProduct = this.purchaseProduct.bind(this);
    }
    //Create a new product and add to blockchain through frontend, it takes input from valid user
    createProduct(name, description, price) {
      this.setState({ loading: true })
      this.state.marketplace.methods.createProduct(name, description, price).send({ from: this.state.account })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
    }

    //tO purchase the product successfully and connect with blockchain 
    purchaseProduct(id, description, price) {
      this.setState({ loading: true })
      this.state.marketplace.methods.purchaseProduct(id).send({ from: this.state.account, value: price })
      .once('receipt', (receipt) => {
        this.setState({ loading: false })
      })
    }

  //frontend to call the other Navigation
  render() {
    return (
      
      <div className="bg">
        <Navbar account={this.state.account} />
        <br/>
        <br/>
        <br/>
        
        
        <div>
          <div>
            
            <main role="main" >
              { //In case if loading is true that is Netid not detected or some other issue pring Loading and wait, else start the frontend 
              this.state.loading
                  ? <div id="loader" className="text-center"><p className="text-center">Loading...</p></div>
                  : <Router>
                  <div className="App">
                <LinkTabs/>
                <Switch>
               
                  <Route
                    path='/Add'
                    //Sending the props to front end
                    render={(props) => (
                    <Add {...props} products={this.state.products} createProduct={this.createProduct} purchaseProduct={this.purchaseProduct}  />
                    )}
                  />
                  <Route
                    path='/Buy'
                    //Sending the props to front end
                    render={(props) => (
                    <Buy {...props} products={this.state.products} createProduct={this.createProduct} purchaseProduct={this.purchaseProduct}  />
                    )}
                  />
                </Switch>
        
                </div>
                </Router>
              }
            </main>
          </div>
        </div>
        <br/>
        <About/>
        
    </div>
    
  
      
    )
  }


}

export default App;
