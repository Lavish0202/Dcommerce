pragma solidity >=0.5.0;

contract Marketplace{
    string public name;
    string public description;
        uint public productCount=0;
        mapping(uint=>Product) public products;
        // Structure of how any product will look in the blochchain
        struct Product{
            uint id;
            uint price;
            string name;
            string description;
            address payable owner;
            bool purchased;
        }
        //event to be called when any item is created in the blockchain
        event productCreate(
            uint id,
            uint price,
            string name,
            string description,
            address payable owner,
            bool purchased
        );
        //event when any user purchases any item from the marketplace
        event productPurchase(
            uint id,
            uint price,
            string name,
            string description,
            address payable owner,
            bool purchased
        );
    
    constructor() public{
        name="Blockchain Dcommerce";
    }
    
    //contract to create a Item and add to blockchain, if any user wants to buy can see it and buy it.
    function createProduct(string memory _name, string memory _description,  uint _price) public {
        //Make sure product details are correct
        //check valid name:
        require(bytes(_name).length > 0);
        //check a valid description
        require(bytes(_description).length > 0);
        //Check if the price is not null
        require(_price>0);
        //Incrementing count of products
        productCount ++;
        //Create a product
        products[productCount]= Product(productCount, _price,_name,_description, msg.sender, false);
        // Trigger an event
        emit productCreate(productCount, _price,_name,_description, msg.sender, false);
        
    }

    //The contract to check and purchase the product, here we check that product id is valid, also if product not already sold, 
    //the buyer must have balance sufficient to the value of the product to buy, buyer and seller must not be the same person,
    //when the ether raches the seller account transfer the ownership of product to buyer. 
    function purchaseProduct(uint _id) public payable{
        //Fetch Product from the id
        Product memory _product = products[_id];
        // Fecth the owner of the product(account)
        address payable _seller= _product.owner;
        //Verify the product id:
        require(_product.id>0 && _product.id<=productCount);
        //require if the ether is enough to transfer
        require(msg.value>=_product.price);
        //Check if product is already sold to some other user
        require(!_product.purchased);
        //check is buyer and seller are not the same person
        require(_seller!=msg.sender);
        // Buy product: Transfer the ownership(the person who will call this function)
        _product.owner=msg.sender;
        //Mark as purchased
        _product.purchased=true;
        //Update it
        products[_id]=_product;
        // Transfer the ether price from buyer to seller
        address(uint160(_seller)).transfer(msg.value);
        // Trigger an event
        emit productPurchase(productCount, _product.price,_product.name,_product.description, msg.sender, true);
    }





} 
