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



  numberProps = tsc.get(7);
  expect(numberProps!.n).toEqual(10192073);
  numberProps = tsc.get(8);
  expect(numberProps!.n).toEqual(27630809);
  numberProps = tsc.get(9);
  expect(numberProps!.n).toEqual(67084307);
  numberProps = tsc.get(10);
  expect(numberProps!.n).toEqual(149096327);
  numberProps = tsc.get(11);
  expect(numberProps!.n).toEqual(308230709);
  numberProps = tsc.get(12);
  expect(numberProps!.n).toEqual(599882573);
  numberProps = tsc.get(13);
  expect(numberProps!.n).toEqual(1109322959);
  numberProps = tsc.get(14);
  expect(numberProps!.n).toEqual(1963420427);
  numberProps = tsc.get(15);
  expect(numberProps!.n).toEqual(3345523457);
  numberProps = tsc.get(16);
  expect(numberProps!.n).toEqual(5514027809);
  numberProps = tsc.get(17);
  expect(numberProps!.n).toEqual(8825193323);
  numberProps = tsc.get(18);
  expect(numberProps!.n).toEqual(13760814959);
  numberProps = tsc.get(19);
  expect(numberProps!.n).toEqual(20961393197);
  numberProps = tsc.get(20);
  expect(numberProps!.n).toEqual(31265489237);
  numberProps = tsc.get(21);
  expect(numberProps!.n).toEqual(45755990759);
  numberProps = tsc.get(22);
  expect(numberProps!.n).toEqual(65814054323);
  numberProps = tsc.get(23);
  expect(numberProps!.n).toEqual(93181530809);
  numberProps = tsc.get(24);
  expect(numberProps!.n).toEqual(130032720617);

  numberProps = tsc.get(25);
  expect(numberProps!.n).toEqual(179056345667);

  numberProps = tsc.get(26);
  expect(numberProps!.n).toEqual(243548665559);
  numberProps = tsc.get(27);
  expect(numberProps!.n).toEqual(327518705573);
  numberProps = tsc.get(28);
  expect(numberProps!.n).toEqual(435806604509);


  numberProps = tsc.get(29);
  expect(numberProps!.n).toEqual(574216130687);
  numberProps = tsc.get(30);
  expect(numberProps!.n).toEqual(749662454747);
  numberProps = tsc.get(31);
  expect(numberProps!.n).toEqual(970336308209);
  numberProps = tsc.get(32);
  expect(numberProps!.n).toEqual(1245885697073);
  numberProps = tsc.get(33);
  expect(numberProps!.n).toEqual(1587616380059);


  numberProps = tsc.get(34);
  expect(numberProps!.n).toEqual(2008712361407);
  numberProps = tsc.get(35);
  expect(numberProps!.n).toEqual(2524477688477);
  numberProps = tsc.get(36);
  expect(numberProps!.n).toEqual(3152600884709);
  numberProps = tsc.get(37);
  expect(numberProps!.n).toEqual(3913443388823);
  numberProps = tsc.get(38);
  expect(numberProps!.n).toEqual(4830353411459);

  // 98 in this case is the max before we exceed max safe int.
  numberProps = tsc.get(98);
  expect(numberProps!.n).toEqual(8862058406050559);
  expect(numberProps!.n).toBeLessThan(Number.MAX_SAFE_INTEGER);
});
