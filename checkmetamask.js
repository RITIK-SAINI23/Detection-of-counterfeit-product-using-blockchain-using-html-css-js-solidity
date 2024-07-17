document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.manufacturer-section, .consumer-section',).forEach(function (div) {
        div.addEventListener('click', async function () {
            // Check if MetaMask is installed
            await handleMetaMaskConnection(div);
        });
    });
});

async function handleMetaMaskConnection(div) {
    if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        try {
            // Request account access if needed
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const sender = accounts[0];

            // If accounts exist, MetaMask is connected
            if (sender) {
                console.log("MetaMask is connected!");
                alert("MetaMask is connected!");

                const isManufacturerSection = div.classList.contains('manufacturer-section');

                if (isManufacturerSection) {
                    // If manufacturer section is clicked, redirect to addproduct.html
                    window.location.href = 'addproduct.html';
                } else {
                    // If consumer section is clicked, redirect to viewregisteredproduct.html
                    window.location.href = 'viewRegisteredProduct.html';
                }
            } else {
                // If accounts do not exist, MetaMask is not connected
                console.error('MetaMask not connected. Please connect MetaMask before proceeding.');
                alert('MetaMask not connected. Please connect MetaMask before proceeding.');
                // You can show an alert or perform other actions to inform the user
            }
        } catch (error) {
            console.error("Error connecting to MetaMask:", error);
            // Show an alert on the same page
            alert('Please connect MetaMask before proceeding.');
        }
    } else {
        console.error("MetaMask not found. Please install MetaMask to use this  feature..");
        // Show an alert on the same page
        alert("MetaMask not found. Please install MetaMask to use this  feature..");
        window.location.href = '#';
    }
}
