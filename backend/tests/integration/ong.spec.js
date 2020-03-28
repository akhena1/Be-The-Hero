const request = require('supertest');
const app = require('../../src/app')
const connection = require('../../src/database/connection')



describe('Tests Group', () => {

    var ongId = '';

    beforeAll(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app)
            .post('/ongs')
            .send({
                name: "APAD2",
                email: "contato@apad.com.br",
                whatsapp: "11940403030",
                city: "Rio do Sul",
                uf: "SC"
            });

        ongId = response.body.id
        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    });

    it('should be able to return a list of ONGS', async () => {
        const response = await request(app)
            .get('/ongs')
        expect(response.statusCode).toBe(200)
    });

    it('should be able to create an incident', async () => {
        const response = await request(app)
            .post('/incidents')
            .set('Authorization', '811c5d15')
            .send({
                title: 'Cachorrinho atropelado',
                description: 'Cachorro foi atropelado e precisa de ajuda',
                value: 120
            });

        expect(response.statusCode).toBe(200)
        expect(response.body).toHaveProperty('id')
        incidentId = response.body.id
    })

    it('should be able to list the incidents', async () => {
        const response = await request(app)
            .get('/incidents')

        expect(response.statusCode).toBe(200)
    })

    it('should be able to delete an incidents', async () => {
        const response = await request(app)
            .del('/incidents/1')
            .set('Authorization', '811c5d15')

        expect(response.statusCode).toBe(204)

    })

    it('should be able to return a list of incidents from specific ONG', async () => {
        const response  = await request(app)
            .get('/profile')
            .set('Authorization', '811c5d15')

        expect(response.statusCode).toBe(200)
    })

    it('should be able to return a name of an ONG when ID is given', async () => {
        const response = await request(app)
            .post('/sessions')
            .send({
                id: ongId
            })
        expect(response.body).toHaveProperty('name')
    })
})