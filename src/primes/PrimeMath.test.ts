import PrimeMath from './PrimeMath';

test('PrimeMath can factorize.', () => {
  expect(PrimeMath.getPrimeFactors(9n)).toEqual([3n,3n]);
  expect(PrimeMath.getPrimeFactors(5n * 7n * 7n * 11n * 3n)).toEqual([3n,5n,7n,7n,11n]);
  expect(PrimeMath.getPrimeFactors(2n * 2n * 2n * 2n * 2n)).toEqual([2n,2n,2n,2n,2n]);
});

test('PrimeMath returns just the prime when factorizing a prime.', () => {
  expect(PrimeMath.getPrimeFactors(2n)).toEqual([2n]);
  expect(PrimeMath.getPrimeFactors(3n)).toEqual([3n]);
  expect(PrimeMath.getPrimeFactors(5n)).toEqual([5n]);
  expect(PrimeMath.getPrimeFactors(11n)).toEqual([11n]);
  expect(PrimeMath.getPrimeFactors(17n)).toEqual([17n]);
  expect(PrimeMath.getPrimeFactors(41n)).toEqual([41n]);
});

test('PrimeMath returns empty array when factorizing 0.', () => {
  expect(PrimeMath.getPrimeFactors(0n)).toEqual([]);
});

test('PrimeMath returns empty array when factorizing 1.', () => {
  expect(PrimeMath.getPrimeFactors(1n)).toEqual([]);
});

test('PrimeMath generates the correct triangular value.', () => {
  expect(PrimeMath.triangularN(0n)).toEqual(0n);
  expect(PrimeMath.triangularN(1n)).toEqual(1n);
  expect(PrimeMath.triangularN(2n)).toEqual(3n);
  expect(PrimeMath.triangularN(3n)).toEqual(6n);
  expect(PrimeMath.triangularN(4n)).toEqual(10n);
  expect(PrimeMath.triangularN(5n)).toEqual(15n);
  expect(PrimeMath.triangularN(6n)).toEqual(21n);
  expect(PrimeMath.triangularN(7n)).toEqual(28n);
});

test('PrimeMath correctly checks if a number is prime.', () => {
  expect(PrimeMath.isPrime(0n)).toEqual(false);
  expect(PrimeMath.isPrime(1n)).toEqual(false);
  expect(PrimeMath.isPrime(2n)).toEqual(true);
  expect(PrimeMath.isPrime(3n)).toEqual(true);
  expect(PrimeMath.isPrime(4n)).toEqual(false);
  expect(PrimeMath.isPrime(5n)).toEqual(true);
  expect(PrimeMath.isPrime(41n)).toEqual(true);
  expect(PrimeMath.isPrime(127n)).toEqual(true);
  expect(PrimeMath.isPrime(349n)).toEqual(true);
  expect(PrimeMath.isPrime(21577n)).toEqual(true);
  expect(PrimeMath.isPrime(104711n)).toEqual(true);
  expect(PrimeMath.isPrime(104713n)).toEqual(false);
});
