const { hasMutation } = require('./mutations');

const mutationController = (req, res) => {
    try {
        const { dna } = req.body;
        if (!dna || !Array.isArray(dna)) {
            return res.status(400).json({ error: 'Invalid DNA input' });
        }

        const result = hasMutation(dna);
        return res.status(200).json({hasMutation: result});

    } catch (error) {
        if (error.message === 'Invalid DNA base') {
            return res.status(400).json({ error: 'Invalid DNA base' });
        }
        return res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = mutationController;