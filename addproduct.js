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
			alert("User denied account access")
		}
	}
	// Legacy dapp browsers...
	else if (window.web3) {
		window.web3 = new Web3(web3.currentProvider);
	}
	// Non-dapp browsers...
	else {
		console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
		alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
	}
});



//CONTRACT DETAILS
const contractABI = [
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
const contractAddress = '0xf8e81D47203A594245E36C48e151709F0C19fBe8';

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
		const accounts = await window.ethereum.request({ method: 'eth_accounts' });
		const selectedAccount = accounts[0];

		// Get the input values from the form
		manufacturer_ID = document.getElementById('manufacturerID').value;
		product_Name = document.getElementById('productName').value;
		product_SN = document.getElementById('productSN').value;
		product_Brand = document.getElementById('productBrand').value;

		if (manufacturer_ID === "" || product_Name === "" || product_SN === "" || product_Brand === "") {
			alert(" Fields are missing!!");
			return;
		}

		// Create a contract instance
		const contract = new window.web3.eth.Contract(contractABI, contractAddress);

		// Check if the product is already registered
		const isProductIDRegistered = await contract.methods.productSNExists(product_SN).call();
		const ismanufacturerIDExists = await contract.methods.manufacturerExists(manufacturer_ID).call();

		if (isProductIDRegistered || ismanufacturerIDExists) {
			// Product is already registered
			alert("This product is already registered!");

		}

		else {
			// Call the smart contract function to add the product
			await contract.methods.addProduct(manufacturer_ID, product_Name, product_SN, product_Brand)
				.send({ from: selectedAccount });

			// Product registered successfully
			alert("Product registered successfully!");

			fetchqr();

		}
	} catch (error) {
		console.error(error);
		alert("Error registering product.");

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

		// Get the input values from the form
		manufacturer_ID = document.getElementById('verifyManufacturerId').value;
		product_SN = document.getElementById('verifyProductSerialNumber').value;
		product_Name = document.getElementById('verifyProductName').value;
		product_Brand = document.getElementById('verifyProductBrand').value;

		if (manufacturer_ID === "" || product_SN === "" || product_Name === "" || product_Brand === "") {
			document.getElementById('verificationResult').innerText = " Fields are missing!!";
			return;
		}

		// Create a contract instance
		const contractInstance = new window.web3.eth.Contract(contractABI, contractAddress);

		// Get the product details from the blockchain
		const productDetails = await contractInstance.methods.verifyAndDisplayDetails(manufacturer_ID, product_SN).call();


		if (productDetails[0] === true && productDetails[1] === manufacturer_ID && productDetails[2] === product_Name && productDetails[3] === product_SN && productDetails[4] === product_Brand) {
			// Display the details on the HTML page
			document.getElementById('M_Id').innerText = "Manufacturer ID: " + productDetails[1];
			document.getElementById('P_Name').innerText = "Product Name: " + productDetails[2];
			document.getElementById('P_SN').innerText = "Product Serial Number: " + productDetails[3];
			document.getElementById('P_Brand').innerText = "Product Brand: " + productDetails[4];

			// Update the result message
			document.getElementById('verificationResult').innerText = " This Product is registered with the manufacturer." + "\n" + "The product is Authentic";
			document.getElementById('lol').style.display = 'block';
			document.getElementById('consumer-qr').style.display = 'block';

			fetchqr();

		} else {
			document.getElementById('verificationResult').innerText = "Product does not exist!";
			document.getElementById('lol').style.display = 'none';
			document.getElementById('consumer-qr').style.display = 'none';

		}
	} catch (error) {
		console.error(error);
		alert("Something went Wrong!")
	}
}

async function fetchqr() {
	console.log("error1");
	qrValue = `Manufacturer id:${manufacturer_ID} | product Name:${product_Name} |Serial Number:${product_SN} | Product brand: ${product_Brand}`;
	console.log("error1");
	qrImage = document.querySelector(".qr-code");
	qrImageResult = qrImage.querySelector("img");
	src = qrImageResult.src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`;

	downloadQrImg = document.getElementById('imgQR');
	downloadQrBtn = document.getElementById('download');
	downloadQrImg.removeAttribute('hidden');
	downloadQrBtn.removeAttribute('hidden');

}

async function saveImage() {
	downloadQrImg = document.getElementById('imgQR');
	downloadQrBtn = document.getElementById('download');
	saveAs(src, qrValue);
	downloadQrImg.setAttribute('hidden', 'hidden');
	downloadQrBtn.setAttribute('hidden', 'hidden');
}