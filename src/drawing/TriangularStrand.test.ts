import PrimeMath from '../primes/PrimeMath';
import NumberLineStrand from './NumberLineStrand';
import TriangularStrand from './TriangularStrand';

test('TriangularStrand can be constructed.', () => {
  const ts = new TriangularStrand(11, 2, new NumberLineStrand());
});

/*test('TriangularStrand loads numbers correctly.', () => {
  const ts = new TriangularStrand(11, 2, new NumberLineStrand());
  ts.loadUpTo(99);   
  expect(ts.numberCache.length).toEqual(100);

  for (let i = 0; i < 100; i++) {
    const numberProps = ts.get(i);
    expect(numberProps.n).toEqual(11 + PrimeMath.triangularN(i) * 2);
  }
  expect(ts.numberCache.length).toEqual(100);
});*/

test('TriangularStrand returns numbers correctly.', () => {
  const ts = new TriangularStrand(11, 2, new NumberLineStrand());

  for (let i = 0; i < 99; i++) {
    const numberProps = ts.get(i);
    expect(numberProps!.n).toEqual(11 + PrimeMath.triangularN(i) * 2);
  }
});

test('TriangularStrand returns the correct number when getting a number higher than its current maximum.', () => {
  const ts = new TriangularStrand(11, 2, new NumberLineStrand());

  const numberProps = ts.get(100);
  expect(numberProps!.n).toEqual(10111);
});

test('TriangularStrand returns the correct number when compositing.', () => {
  const tsc = new TriangularStrand(0, 2, new TriangularStrand(17, 2, new NumberLineStrand()));

  let numberProps = tsc.get(0);
  expect(numberProps!.n).toEqual(17);

  numberProps = tsc.get(1);
  expect(numberProps!.n).toEqual(23);

  numberProps = tsc.get(2);
  expect(numberProps!.n).toEqual(59);

  numberProps = tsc.get(3);
  expect(numberProps!.n).toEqual(173);

  numberProps = tsc.get(4);
  expect(numberProps!.n).toEqual(437);

  numberProps = tsc.get(5);
  expect(numberProps!.n).toEqual(947);

  numberProps = tsc.get(6);
  expect(numberProps!.n).toEqual(1823);

  numberProps = tsc.get(7);
  expect(numberProps!.n).toEqual(3209);

  numberProps = tsc.get(8);
  expect(numberProps!.n).toEqual(5273);

  numberProps = tsc.get(9);
  expect(numberProps!.n).toEqual(8207);
});

test('TriangularStrand returns the correct number when triple compositing.', () => {
  const tsc = new TriangularStrand(0, 2, new TriangularStrand(0, 2, new TriangularStrand(17, 2, new NumberLineStrand())));

  let numberProps = tsc.get(0);
  expect(numberProps!.n).toEqual(17);

  numberProps = tsc.get(1);
  expect(numberProps!.n).toEqual(59);

  numberProps = tsc.get(2);
  expect(numberProps!.n).toEqual(1823);

  numberProps = tsc.get(3);
  expect(numberProps!.n).toEqual(24509);

  numberProps = tsc.get(4);
  expect(numberProps!.n).toEqual(176837);

  numberProps = tsc.get(5);
  expect(numberProps!.n).toEqual(865847);

  numberProps = tsc.get(6);
  expect(numberProps!.n).toEqual(3263459);
});
