const { assert } = require("chai");

const Marketplace = artifacts.require("Marketplace");

require('chai')
.use(require('chai-as-promised'))
.should()

contract('Marketplace' ,([deployer,seller,buyer])=>{
    let marketplace;
    before(async()=>{
        marketplace= await Marketplace.deployed();
    })
    describe('deployment',async ()=>{
        it('deployed successfully', async()=>{
            const address= await marketplace.address
            //Assuring that address is not 0 or null
            assert.notEqual(address, 0x0);
            assert.notEqual(address, '');
            assert.notEqual(address, null);
            assert.notEqual(address, undefined);
        })
        it('has a name', async()=>{
            const name=await marketplace.name()
            assert.equal(name, "Blockchain Dcommerce");
        })
    })


    describe('products',async ()=>{
        let result, productCount;
        before(async()=>{
            result= await marketplace.createProduct("MacBook",web3.utils.toWei('1','Ether'),{from: seller});
            productCount= await marketplace.productCount();
        })

        
        it('create products', async()=>{
            //Case of Valid entries
            assert.equal(productCount, 1);
            const event= result.logs[0].args
            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, "MacBook", 'name is correct')
            assert.equal(event.price, "1000000000000000000", 'price is correct')
            assert.equal(event.owner, seller, 'id is correct')
            assert.equal(event.purchased, false, 'purchase is correct')

            //Invalid or empty entries: Product name missing
            await marketplace.createProduct('',web3.utils.toWei('1','Ether'),{from: seller}).should.be.rejected;
            //Invalid or empty entries: Product price missing
            await marketplace.createProduct('MacBook',0,{from: seller}).should.be.rejected;

        })


        it('list products', async()=>{
           const product= await marketplace.products(productCount)
           assert.equal(product.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(product.name, "MacBook", 'name is correct')
            assert.equal(product.price, "1000000000000000000", 'price is correct')
            assert.equal(product.owner, seller, 'id is correct')
            assert.equal(product.purchased, false, 'purchase is correct')

           

        })

        it('sell product', async()=>{
            //Track balance of seller
            let OldSellerbalance
            OldSellerbalance=await web3.eth.getBalance(seller)
            OldSellerbalance=new web3.utils.BN(OldSellerbalance)
            //Sucess: Purchase is complete
            result= await marketplace.purchaseProduct(productCount,{from: buyer, value: web3.utils.toWei('1','Ether')})
            
            //Check the logs
            const event= result.logs[0].args

            assert.equal(event.id.toNumber(), productCount.toNumber(), 'id is correct')
            assert.equal(event.name, "MacBook", 'name is correct')
            assert.equal(event.price, "1000000000000000000", 'price is correct')
            assert.equal(event.owner, buyer, 'id is correct')
            assert.equal(event.purchased, true, 'purchase is correct')

            //Seller received the funds:
            //New seller balance track
            let NewSellerbalance
            NewSellerbalance=await web3.eth.getBalance(seller)
            NewSellerbalance=new web3.utils.BN(NewSellerbalance)

            let price
            price= web3.utils.toWei('1','Ether')
            price= new web3.utils.BN(price)

            const ExpectedBalance= OldSellerbalance.add(price)
            assert.equal(NewSellerbalance.toString(),ExpectedBalance.toString())

            //Check for invalid failure attempts
            //If product is invalid that is Id does not exists:
            await marketplace.purchaseProduct(100,{from : buyer, value: web3.utils.toWei('1','Ether')}).should.be.rejected;
            //Enough ether to purchase the product
            await marketplace.purchaseProduct(productCount,{from : buyer, value: web3.utils.toWei('0.5','Ether')}).should.be.rejected;
            //Deployer or some other tries to purchase the sold product i.e double purchase
            await marketplace.purchaseProduct(productCount,{from : deployer, value: web3.utils.toWei('1','Ether')}).should.be.rejected;
            //Buyer tries to buy again, buyer cannot be seller:
            await marketplace.purchaseProduct(productCount,{from : buyer, value: web3.utils.toWei('1','Ether')}).should.be.rejected;
            
 
         })

       
        
    })
})