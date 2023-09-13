require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mutationController = require('./mutations/controller');

const app = express();
console.log({env: process.env});
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON requests
app.use(bodyParser.json());

/**
 * Endpoint to check for DNA mutation
 */
app.post('/mutation/', mutationController);

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = { app, server };
