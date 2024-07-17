
const contractAddress = '0x27a31a8f60ec25c4cfdfb72738c108c81f5e7b55';
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_manufacturerID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_productSN",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_productBrand",
				"type": "string"
			}
		],
		"name": "addProduct",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "string",
				"name": "manufacturerID",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "productSN",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "productBrand",
				"type": "string"
			}
		],
		"name": "ProductRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "manufacturerExists",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"name": "products",
		"outputs": [
			{
				"internalType": "string",
				"name": "manufacturerID",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "productName",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "productSN",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "productBrand",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_manufacturerID",
				"type": "string"
			}
		],
		"name": "verifyAndDisplayDetails",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

async function registerProduct() {
	try {
		// Check if Metamask is installed
		if (typeof window.ethereum === 'undefined') {
			alert("Please install MetaMask to use this feature.");
			return;
		}

		// Request account access if not already authorized
		await window.ethereum.request({ method: 'eth_requestAccounts' });

		// Get the selected account
		const accounts = await web3.eth.getAccounts();
		const selectedAccount = accounts[0];

		// Get the input values from the form
		const manufacturerID = document.getElementById('manufacturerID').value;
		const productName = document.getElementById('productName').value;
		const productSN = document.getElementById('productSN').value;
		const productBrand = document.getElementById('productBrand').value;

		// Create a contract instance
		const contract = new web3.eth.Contract(contractABI, contractAddress);

		// Check if the product is already registered
		const isProductRegistered = await contract.methods.manufacturerExists(manufacturerID).call();

		if (isProductRegistered) {
			// Product is already registered
			alert("This product is already registered!");
		} else {
			// Call the smart contract function to add the product
			await contract.methods.addProduct(manufacturerID, productName, productSN, productBrand)
				.send({ from: selectedAccount });

			// Product registered successfully
			alert("Product registered successfully!");
		}
	} catch (error) {
		console.error(error);
		alert("Error registering product. Please check the console for details.");
	}
}

async function verifyData() {
	try {
		// Check if Metamask is installed
		if (typeof window.ethereum === 'undefined') {
			alert("Please install MetaMask to use this feature.");
			return;
		}

		// Request account access if not already authorized
		await window.ethereum.request({ method: 'eth_requestAccounts' });

		// Get the selected account
		const accounts = await web3.eth.getAccounts();
		const selectedAccount = accounts[0];

		// Get the input values from the form
		const verifyManufacturerId = document.getElementById('verifyManufacturerId').value;
		const verifyProductSerialNumber = document.getElementById('verifyProductSerialNumber').value;
		// Create a contract instance
		const contract = new web3.eth.Contract(contractABI, contractAddress);

		// Get the product details from the blockchain
		const productDetails = await contract.methods.verifyAndDisplayDetails(verifyManufacturerId).call();

		// Display the details on the HTML page
		document.getElementById('M_Id').innerText = "Manufacturer ID: " + productDetails[0];
		document.getElementById('P_Name').innerText = "Product Name: " + productDetails[1];
		document.getElementById('P_SN').innerText = "Product Serial Number: " + productDetails[2];
		document.getElementById('P_Brand').innerText = "Product Brand: " + productDetails[3];

		// Update the result message
		document.getElementById('verificationResult').innerText = "Product is already registered!";
	} catch (error) {
		console.error(error);
		alert("Error verifying data. Please check the console for details.");
	}
}

// Connect to Metamask on page load
window.addEventListener('load', async () => {
	// Modern dapp browsers...
	if (window.ethereum) {
		window.web3 = new Web3(ethereum);
		try {
			// Request account access if needed
			await ethereum.request({ method: 'eth_requestAccounts' });
		} catch (error) {
			// User denied account access...
			console.error("User denied account access");
		}
	}
	// Legacy dapp browsers...
	else if (window.web3) {
		window.web3 = new Web3(web3.currentProvider);
	}
	// Non-dapp browsers...
	else {
		console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
	}
});
