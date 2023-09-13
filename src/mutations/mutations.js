function checkMutation(dna, x, y) {
    const directions = [[1, 0], [0, 1], [1, 1], [1, -1]];
    const n = dna.length;
    const base = dna[x][y];

    return directions.some(([dx, dy]) => {
        const sequence = Array.from({ length: 4 }, (_, i) => {
            const nx = x + dx * i;
            const ny = y + dy * i;
            return (nx >= 0 && nx < n && ny >= 0 && ny < n) ? dna[nx][ny] : null;
        });
        return sequence.every(b => b === base);
    });
}

/**
 * Determines if a given DNA sequence has a mutation.
 * A mutation is identified if more than one sequence of four identical letters is found obliquely, horizontally, or vertically.
 * 
 * @param {string[]} dna - An array of strings representing each row of an NxN DNA sequence table. Valid letters are: A, T, C, G.
 * @returns {boolean} - Returns true if a mutation is detected, otherwise false.
 * @throws {Error} - Throws an error if an invalid DNA base is detected.
 */
function hasMutation(dna) {
    const n = dna.length;
    let count = 0;

    // Validate DNA base
    const validBases = ['A', 'T', 'C', 'G'];
    if (!dna.every(seq => seq.split('').every(base => validBases.includes(base)))) {
        throw new Error('Invalid DNA base');
    }

    dna.some((_, i) => {
        return dna.some((_, j) => {
            if (checkMutation(dna, i, j)) {
                count++;
                return count > 1; // If we found more than one mutation, search finishes
            }
            return false;
        });
    });

    return count > 1;
}

module.exports = { hasMutation };
