// save this as index.js
const express = require('express');
const path = require('path');
const app = express();

// Middleware to serve static files from the current directory
app.use(express.static(__dirname));

// Function to validate phone number format
function isValidPhoneNumber(phone) {
    const phonePattern = /^\d{3}-\d{3}-\d{4}$/;
    return phonePattern.test(phone);
}

// Route to serve the HTML page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'form.html'));
});

// Route to handle phone number validation
app.get('/validate-phone', (req, res) => {
    const { name, phone } = req.query;

    if (isValidPhoneNumber(phone)) {
        res.send(`Hello ${name}, the phone number ${phone} is valid.`);
    } else {
        res.send(`Hello ${name}, the phone number ${phone} is invalid. Please use the format ddd-ddd-dddd.`);
    }
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
