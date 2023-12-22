class PrimeMath {
    static getPrimeFactors(n: bigint): bigint[] {
        if (n == 0n) return [];

        let factors: bigint[] = [];
    
        // Handle 2 separately.
        const two: bigint = 2n;
        const zero: bigint = 0n;
        while (n % two === zero) {
            factors.push(two);
            n = n / two;
        }
    
        // Check for odd numbers.
        for (let i = 3n; i * i <= n; i += 2n) {
            while (n % i === 0n) {
                factors.push(i);
                n = n / i;
            }
        }
    
        // If n becomes a prime number greater than 2.
        if (n > 2n) {
            factors.push(n);
        }
    
        return factors;
    }

    static isPrime(n: bigint): boolean {
        // Check for less than 2 and for 2 and 3 directly.
        if (n < 2n) return false;
        if (n === 2n || n === 3n) return true;
    
        // Eliminate multiples of 2 and 3.
        if (n % 2n === 0n || n % 3n === 0n) return false;
    
        // Check for divisors from 5 to sqrt(n), stepping by 6.
        for (let i = 5n; i * i <= n; i += 6n) {
            if (n % i === 0n || n % (i + 2n) === 0n) return false;
        }
    
        return true;
    }

    static triangularN(n:bigint): bigint {
        return (n * (n + 1n)) / 2n;
    }
}

export default PrimeMath;
