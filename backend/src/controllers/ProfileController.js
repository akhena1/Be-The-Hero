const connection = require('../database/connection')

module.exports = {
    async index(req, res) {
        const ong_id = req.headers.authorization;

        if (ong_id) {
            const incidents = await connection('incidents')
                .where('ong_id', ong_id)
                .select('*');

            return res.json(incidents)
        } else {
            return res.status(400).json({ error: "Nada encontrado" })
        }



    }
}