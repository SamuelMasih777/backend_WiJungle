const Data = require('../models/alert.model');

const dataFetch = async (req, res) => {
    try {
        const data = await Data.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = dataFetch;