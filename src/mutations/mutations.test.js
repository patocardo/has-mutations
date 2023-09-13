const { hasMutation } = require('./mutations');

describe('Mutation Detection', () => {
    test('should detect mutation in given DNA sequence', () => {
        const dnaWithMutation = ["ATGCGA","CAGTGC","TTATGT","AGAAGG","CCCCTA","TCACTG"];
        expect(hasMutation(dnaWithMutation)).toBe(true);
    });

    test('should not detect mutation in given DNA sequence', () => {
        const dnaWithoutMutation = ["ATGCGA","CAGTGC","TTATTT","AGACGG","GCGTCA","TCACTG"];
        expect(hasMutation(dnaWithoutMutation)).toBe(false);
    });

    test('should throw error for invalid DNA base', () => {
        const dnaWithInvalidBase = ["ATGCGA","CAGTGC","TTATZT","AGACGG","GCGTCA","TCACTG"];
        expect(() => hasMutation(dnaWithInvalidBase)).toThrow('Invalid DNA base');
    });
});
