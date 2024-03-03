const axios = require('axios');

const makeMongoApiRequest = async () => {
    try {
        const data = {
            "collection": "store",
            "database": "pharm",
            "dataSource": "Cluster0",
            "projection": {
                "_id": 1
            }
        };

        const config = {
            method: 'post',
            url: 'https://eu-central-1.aws.data.mongodb-api.com/app/data-wubht/endpoint/data/v1/action/findOne',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': 'pRBd6Qg0CGTlJ8HpyMoqZKvtVOrvctLQpZF608jEDvKK4rB0MaINY1wffOOTCeSQ',
            },
            data: data
        };

        const response = await axios(config);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports = makeMongoApiRequest;
