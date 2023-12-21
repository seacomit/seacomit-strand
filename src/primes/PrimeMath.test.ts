import PrimeMath from './PrimeMath';

test('PrimeMath can factorize.', () => {
  expect(PrimeMath.getPrimeFactors(9)).toEqual([3,3]);
  expect(PrimeMath.getPrimeFactors(5 * 7 * 7 * 11 * 3)).toEqual([3,5,7,7,11]);
  expect(PrimeMath.getPrimeFactors(2 * 2 * 2 * 2 * 2)).toEqual([2,2,2,2,2]);
});

test('PrimeMath returns just the prime when factorizing a prime.', () => {
  expect(PrimeMath.getPrimeFactors(2)).toEqual([2]);
  expect(PrimeMath.getPrimeFactors(3)).toEqual([3]);
  expect(PrimeMath.getPrimeFactors(5)).toEqual([5]);
  expect(PrimeMath.getPrimeFactors(11)).toEqual([11]);
  expect(PrimeMath.getPrimeFactors(17)).toEqual([17]);
  expect(PrimeMath.getPrimeFactors(41)).toEqual([41]);
});

test('PrimeMath returns empty array when factorizing 0.', () => {
  expect(PrimeMath.getPrimeFactors(0)).toEqual([]);
});

test('PrimeMath returns empty array when factorizing 1.', () => {
  expect(PrimeMath.getPrimeFactors(1)).toEqual([]);
});

test('PrimeMath generates the correct triangular value.', () => {
  expect(PrimeMath.triangularN(0)).toEqual(0);
  expect(PrimeMath.triangularN(1)).toEqual(1);
  expect(PrimeMath.triangularN(2)).toEqual(3);
  expect(PrimeMath.triangularN(3)).toEqual(6);
  expect(PrimeMath.triangularN(4)).toEqual(10);
  expect(PrimeMath.triangularN(5)).toEqual(15);
  expect(PrimeMath.triangularN(6)).toEqual(21);
  expect(PrimeMath.triangularN(7)).toEqual(28);
});

test('PrimeMath correctly checks if a number is prime.', () => {
  expect(PrimeMath.isPrime(0)).toEqual(false);
  expect(PrimeMath.isPrime(1)).toEqual(false);
  expect(PrimeMath.isPrime(2)).toEqual(true);
  expect(PrimeMath.isPrime(3)).toEqual(true);
  expect(PrimeMath.isPrime(4)).toEqual(false);
  expect(PrimeMath.isPrime(5)).toEqual(true);
  expect(PrimeMath.isPrime(41)).toEqual(true);
  expect(PrimeMath.isPrime(127)).toEqual(true);
  expect(PrimeMath.isPrime(349)).toEqual(true);
  expect(PrimeMath.isPrime(21577)).toEqual(true);
  expect(PrimeMath.isPrime(104711)).toEqual(true);
  expect(PrimeMath.isPrime(104713)).toEqual(false);
});
