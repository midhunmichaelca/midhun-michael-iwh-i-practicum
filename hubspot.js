const axios = require('axios');

async function createOrUpdateHubspotRecord(email, name, contactNumber, accessToken) {
    const url = "https://api.hubapi.com/crm/v3/objects/contacts";
    const headers = {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
    };
    const data = {
        properties: {
            email: email,
            firstname: name,
            phone: contactNumber
        }
    };
    try {
        const response = await axios.post(url, data, { headers });
        return "HubSpot record created/updated successfully";
    } catch (error) {
        console.error(`Error creating/updating HubSpot record: ${error}`);
        return "Failed to create/update HubSpot record";
    }
}

module.exports = createOrUpdateHubspotRecord;
