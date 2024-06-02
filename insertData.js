const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const connectDB = require('./config/dbconfig');
require('dotenv').config();

const insertData = async () => {
    const maxRetries = 5;
    let attempts = 0;

    try {        
        await connectDB();

        // Defined a schema and model for the data
        const dataSchema = new mongoose.Schema({}, { strict: false });
        const DataModel = mongoose.model('data', dataSchema);

        // Read the JSON file
        const dataPath = path.join(__dirname, 'evejson.json');
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        while (attempts < maxRetries) {
            try {               
                const result = await DataModel.insertMany(data);
                console.log(`${result.length} documents were inserted.`);
                break; 
            } catch (error) {
                if (error.name === 'MongoNetworkError' || error.name === 'MongoServerError') {
                    attempts++;
                    console.error(`Retryable error occurred (attempt ${attempts} of ${maxRetries}). Retrying...`);
                    if (attempts >= maxRetries) {
                        throw new Error(`Failed after ${maxRetries} attempts: ${error.message}`);
                    }
                } else {
                    throw error; 
                }
            }
        }
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        // Close the connection
        mongoose.connection.close(() => {
            process.exit(0); 
        });
    }
};

insertData();
