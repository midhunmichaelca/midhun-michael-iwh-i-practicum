const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Homepage route
app.get('/', async (req, res) => {
    try {
        // Make a GET request to retrieve CRM record data
        const response = await axios.get('<HubSpot API endpoint>');
        const customObjects = response.data; // Assuming response.data contains CRM record data

        res.render('homepage', { customObjects });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

// Route to render HTML form
app.get('/update-cobj', (req, res) => {
    res.render('updates', { pageTitle: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

// Route to handle form submission
app.post('/update-cobj', async (req, res) => {
    try {
        // Make a POST request with the HTML form data to create a new CRM record
        // Use req.body to access form data

        // After CRM record is created, redirect back to homepage
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
