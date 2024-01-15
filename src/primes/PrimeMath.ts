import { off } from "process";
import IFactorLockTest from "./FactorLockTest";

class PrimeMath {

    static primeCache = [2,3,5,7,11,13,17,19,23,29,31,37];

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


    static loadMorePrimes(amount:number, offset:number) {
        const primesToCalcUpTo = offset + amount;
        const highestPrimeInCache = this.primeCache[this.primeCache.length - 1];
        if (highestPrimeInCache < primesToCalcUpTo) {
            for (let i = 0; i < primesToCalcUpTo; i++) {
                const nToCheck = i + highestPrimeInCache + 1;
                if (this.isPrime(BigInt(nToCheck))) {
                    // Its prime, add to prime cache.
                    this.primeCache.push(nToCheck);
                }
            }
        }

        if (this.primeCache.length < amount) {
            this.loadMorePrimes(amount, offset + amount);
        }
    }

    static calculateLockedPrimeFactors(startN:bigint, triangularMult:bigint, amount:number, offset:number): IFactorLockTest[] {
        this.loadMorePrimes(amount, offset);
        const factorLockTests = [];

        for (let i = 0; i < amount; i++) {
            const prime = BigInt(this.primeCache[i]);
            const partial = startN % prime;
            if (partial == 0n) {
                // not locked, starting on a multiple
            } else {
                // need to run the sequence up to prime times( maybe only half because it mirrors?)
                let locked = true;
                for (let x = 0n; x < prime; x++) {
                    const triangularN = this.triangularN(x) * triangularMult;
                    const triPartial = (startN + triangularN) % prime;
                    if (triPartial == 0n) {
                        // This factor is not locked, don't bother calculating more.
                        locked = false;
                        break;
                    }
                }
                if (locked) {
                    factorLockTests.push({
                        remainder: partial,
                        divisor: prime,
                        locked: true,
                    });
                } else {
                    factorLockTests.push({
                        remainder: partial,
                        divisor: prime,
                        locked: false,
                    });
                }
            }
        }

        return factorLockTests;
    }

    static calculateFactorLockSets() {
        
    }
}

export default PrimeMath;
