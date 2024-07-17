// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ProductContract {
    // Structure to store product details
    struct Product {
        string manufacturerID;
        string productName;
        string productSN;
        string productBrand;
    }

    // Mapping to store product details by manufacturerID
    mapping(string => Product) public products;

    // Mapping to check if a manufacturerID is registered
    mapping(string => bool) public manufacturerExists;

    // Mapping to check if a productSN is registered
    mapping(string => bool) public productSNExists;

    // Event to log product registration
    event ProductRegistered(string manufacturerID, string productName, string productSN, string productBrand);

    // Function to add product details to the blockchain
    function addProduct(
        string memory _manufacturerID,
        string memory _productName,
        string memory _productSN,
        string memory _productBrand
    ) external {


        // Check if the product is not already registered
        require(!productSNExists[_productSN], "Serial number already registered");

        // Check if the manufacturer is not already registered
        require(!manufacturerExists[_manufacturerID], "Manufacturer already registered");

        // Create a new Product instance
        Product memory newProduct = Product({
            manufacturerID: _manufacturerID,
            productName: _productName,
            productSN: _productSN,
            productBrand: _productBrand
        });

        // Store the product details in the mapping
        products[_manufacturerID] = newProduct;

        // Set manufacturerExists to true to mark the manufacturer as registered
        manufacturerExists[_manufacturerID] = true;

        // Set productExists to true to mark the product as registered
        productSNExists[_productSN] = true;

        // Emit an event for product registration
        emit ProductRegistered(_manufacturerID, _productName, _productSN, _productBrand);
    }


function verifyAndDisplayDetails(string memory _manufacturerID, string memory _productSN) external view
    returns (bool success, string memory, string memory, string memory, string memory)
{
    // Check if the manufacturer is registered
    if (!manufacturerExists[_manufacturerID]) {
        return (false, "", "", "", "Manufacturer id not exist");
    }

    // Check if the product is registered
    if (!productSNExists[_productSN]) {
        return (false, "", "", "", "Product not exist");
    }

    // Return product details if both manufacturer and product are found
    return (
        true,
        products[_manufacturerID].manufacturerID,
        products[_manufacturerID].productName,
        products[_manufacturerID].productSN,
        products[_manufacturerID].productBrand
    );
}
}