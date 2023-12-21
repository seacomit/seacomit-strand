class PrimeMath {
    static getPrimeFactors(n: number): number[] {
        if (n == 0) return [];

        let factors: number[] = [];
    
        // Handle 2 separately.
        while (n % 2 === 0) {
            factors.push(2);
            n = n / 2;
        }
    
        // Check for odd numbers.
        for (let i = 3; i <= Math.sqrt(n); i += 2) {
            while (n % i === 0) {
                factors.push(i);
                n = n / i;
            }
        }
    
        // If n becomes a prime number greater than 2.
        if (n > 2) {
            factors.push(n);
        }
    
        return factors;
    }

    static isPrime(n: number): boolean {
        // Check for less than 2 and for 2 and 3 directly.
        if (n < 2) return false;
        if (n === 2 || n === 3) return true;
    
        // Eliminate multiples of 2 and 3.
        if (n % 2 === 0 || n % 3 === 0) return false;
    
        // Check for divisors from 5 to sqrt(n), stepping by 6.
        for (let i = 5; i * i <= n; i += 6) {
            if (n % i === 0 || n % (i + 2) === 0) return false;
        }
    
        return true;
    }

    static triangularN(n:number): number {
        return (n * (n + 1)) / 2;
    }
}

export default PrimeMath;
