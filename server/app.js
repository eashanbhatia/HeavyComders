const express = require('express');
const path = require('path')
const PORT = 5000;
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();
const mongoose = require('mongoose');


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))



app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());




const { MongoClient } = require('mongodb');


    const uri = process.env.MONGO_URL;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
app.post('/find-products', async (req, res) => {
    const imageNames = req.body.imageNames;

    if (!Array.isArray(imageNames)) {
        return res.status(400).send({ error: 'imageNames must be an array' });
    }

    try {
        await client.connect();
        const database = client.db('test'); // Replace with your database name
        const collection = database.collection('hoproducts');

        const results = [];
        
        for (const imageName of imageNames) {
            const query = { image_name: imageName };
            const product = await collection.findOne(query);
            if (product) {
                results.push(product);
            }
        }
        console.log(results)
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'An error occurred while fetching the products' });
    } finally {
        await client.close();
    }
});

mongoose.connect(process.env.MONGO_URL).then(() => {
    app.listen(PORT, () => {
        console.log(` http://localhost:` + PORT)
    });
});

