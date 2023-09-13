const request = require('supertest');
const { app, server } = require('../src/index');

describe('API Endpoints', () => {
    test('should detect mutation in given DNA sequence', async () => {
        const response = await request(app)
            .post('/mutation/')
            .send({
                dna: ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"]
            });
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ hasMutation: true });
    });

    test('should not detect mutation in given DNA sequence', async () => {
        const response = await request(app)
            .post('/mutation/')
            .send({
                dna: ["ATGCGA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"]
            });
        
        expect(response.statusCode).toBe(200);
        expect(response.body).toEqual({ hasMutation: false });
    });

    test('should return error for invalid DNA base', async () => {
        const response = await request(app)
            .post('/mutation/')
            .send({
                dna: ["ATGCGA","CAGTGC","TTATZT","AGACGG","GCGTCA","TCACTG"]
            });
        
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid DNA base' });
    });

    test('should return error for invalid DNA input', async () => {
        const response = await request(app)
            .post('/mutation/')
            .send({
                dna: "INVALID_INPUT"
            });
        
        expect(response.statusCode).toBe(400);
        expect(response.body).toEqual({ error: 'Invalid DNA input' });
    });

    afterAll(done => {
        server.close(done);
    });
});
