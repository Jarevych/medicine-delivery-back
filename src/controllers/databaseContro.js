// controllers/databaseController.js

const axios = require('axios');

// Функція для перевірки доступу до бази даних
async function checkDatabaseAccess(req, res) {
    try {
        const data = JSON.stringify({
            "collection": "store",
            "database": "pharm",
            "dataSource": "Cluster0",
            "projection": {
                "_id": 1
            }
        });

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

        // Викликаємо запит до MongoDB API
        const response = await axios(config);

        // Виводимо результат у відповідь клієнту
        res.json(response.data);
    } catch (error) {
        // В разі помилки повертаємо статус 500 та повідомлення про помилку
        res.status(500).json({ error: "Помилка при перевірці доступу до бази даних" });
        console.error("Помилка:", error);
    }
}

module.exports = { checkDatabaseAccess };
