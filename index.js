require('dotenv').config(); // Load environment variables

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const createOrUpdateHubspotRecord = require('./hubspot');

const app = express();
const PORT = process.env.PORT || 3000;
const privateAppToken = process.env.HUBSPOT_PRIVATE_APP_TOKEN; // Access private app token

app.set('view engine', 'pug');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Add JSON body parser middleware

// Homepage route
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('https://api.hubapi.com/crm/v3/objects/contacts', {
            headers: {
                'Authorization': `Bearer ${privateAppToken}` // Include private app token in request headers
            }
        });
        const customObjects = response.data;

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
        const { name, email, contactNumber } = req.body;

        // Call function to create/update HubSpot record
        const result = await createOrUpdateHubspotRecord(email, name, contactNumber, privateAppToken);

        console.log(result); // Log the response from HubSpot API

        // After CRM contact record is created, redirect back to homepage or display success message
        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
