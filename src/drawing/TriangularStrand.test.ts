import PrimeMath from '../primes/PrimeMath';
import NumberLineStrand from './NumberLineStrand';
import TriangularStrand from './TriangularStrand';

test('TriangularStrand can be constructed.', () => {
  const ts = new TriangularStrand(11n, 2n, new NumberLineStrand());
});

test('TriangularStrand loads numbers correctly.', () => {
  const ts = new TriangularStrand(11n, 2n, new NumberLineStrand());
  ts.loadUpTo(99);   
  expect(ts.numberLine.length).toEqual(100);

  for (let i = 0n; i < 100n; i++) {
    const numberProps = ts.get(i);
    expect(numberProps.n).toEqual(11n + PrimeMath.triangularN(i) * 2n);
  }
  expect(ts.numberLine.length).toEqual(100);
});

test('TriangularStrand returns numbers correctly.', () => {
  const ts = new TriangularStrand(11n, 2n, new NumberLineStrand());

  for (let i = 0n; i < 99n; i++) {
    const numberProps = ts.get(i);
    expect(numberProps!.n).toEqual(11n + PrimeMath.triangularN(i) * 2n);
  }
});

test('TriangularStrand returns the correct number when getting a number higher than its current maximum.', () => {
  const ts = new TriangularStrand(11n, 2n, new NumberLineStrand());

  const numberProps = ts.get(100n);
  expect(numberProps!.n).toEqual(10111n);
});

test('TriangularStrand returns the correct number when compositing.', () => {
  const tsc = new TriangularStrand(0n, 2n, new TriangularStrand(17n, 2n, new NumberLineStrand()));

  let numberProps = tsc.get(0n);
  expect(numberProps!.n).toEqual(17n);

  numberProps = tsc.get(1n);
  expect(numberProps!.n).toEqual(23n);

  numberProps = tsc.get(2n);
  expect(numberProps!.n).toEqual(59n);

  numberProps = tsc.get(3n);
  expect(numberProps!.n).toEqual(173n);

  numberProps = tsc.get(4n);
  expect(numberProps!.n).toEqual(437n);

  numberProps = tsc.get(5n);
  expect(numberProps!.n).toEqual(947n);

  numberProps = tsc.get(6n);
  expect(numberProps!.n).toEqual(1823n);

  numberProps = tsc.get(7n);
  expect(numberProps!.n).toEqual(3209n);

  numberProps = tsc.get(8n);
  expect(numberProps!.n).toEqual(5273n);

  numberProps = tsc.get(9n);
  expect(numberProps!.n).toEqual(8207n);
});

test('TriangularStrand returns the correct number when triple compositing.', () => {
  const tsc = new TriangularStrand(0n, 2n, new TriangularStrand(0n, 2n, new TriangularStrand(17n, 2n, new NumberLineStrand())));

  let numberProps = tsc.get(0n);
  expect(numberProps!.n).toEqual(17n);

  numberProps = tsc.get(1n);
  expect(numberProps!.n).toEqual(59n);

  numberProps = tsc.get(2n);
  expect(numberProps!.n).toEqual(1823n);

  numberProps = tsc.get(3n);
  expect(numberProps!.n).toEqual(24509n);

  numberProps = tsc.get(4n);
  expect(numberProps!.n).toEqual(176837n);

  numberProps = tsc.get(5n);
  expect(numberProps!.n).toEqual(865847n);

  numberProps = tsc.get(6n);
  expect(numberProps!.n).toEqual(3263459n);



  numberProps = tsc.get(7n);
  expect(numberProps!.n).toEqual(10192073n);
  numberProps = tsc.get(8n);
  expect(numberProps!.n).toEqual(27630809n);
  numberProps = tsc.get(9n);
  expect(numberProps!.n).toEqual(67084307n);
  numberProps = tsc.get(10n);
  expect(numberProps!.n).toEqual(149096327n);
  numberProps = tsc.get(11n);
  expect(numberProps!.n).toEqual(308230709n);
  numberProps = tsc.get(12n);
  expect(numberProps!.n).toEqual(599882573n);
  numberProps = tsc.get(13n);
  expect(numberProps!.n).toEqual(1109322959n);
  numberProps = tsc.get(14n);
  expect(numberProps!.n).toEqual(1963420427n);
  numberProps = tsc.get(15n);
  expect(numberProps!.n).toEqual(3345523457n);
  numberProps = tsc.get(16n);
  expect(numberProps!.n).toEqual(5514027809n);
  numberProps = tsc.get(17n);
  expect(numberProps!.n).toEqual(8825193323n);
  numberProps = tsc.get(18n);
  expect(numberProps!.n).toEqual(13760814959n);
  numberProps = tsc.get(19n);
  expect(numberProps!.n).toEqual(20961393197n);
  numberProps = tsc.get(20n);
  expect(numberProps!.n).toEqual(31265489237n);
  numberProps = tsc.get(21n);
  expect(numberProps!.n).toEqual(45755990759n);
  numberProps = tsc.get(22n);
  expect(numberProps!.n).toEqual(65814054323n);
  numberProps = tsc.get(23n);
  expect(numberProps!.n).toEqual(93181530809n);
  numberProps = tsc.get(24n);
  expect(numberProps!.n).toEqual(130032720617n);

  numberProps = tsc.get(25n);
  expect(numberProps!.n).toEqual(179056345667n);

  numberProps = tsc.get(26n);
  expect(numberProps!.n).toEqual(243548665559n);
  numberProps = tsc.get(27n);
  expect(numberProps!.n).toEqual(327518705573n);
  numberProps = tsc.get(28n);
  expect(numberProps!.n).toEqual(435806604509n);


  numberProps = tsc.get(29n);
  expect(numberProps!.n).toEqual(574216130687n);
  numberProps = tsc.get(30n);
  expect(numberProps!.n).toEqual(749662454747n);
  numberProps = tsc.get(31n);
  expect(numberProps!.n).toEqual(970336308209n);
  numberProps = tsc.get(32n);
  expect(numberProps!.n).toEqual(1245885697073n);
  numberProps = tsc.get(33n);
  expect(numberProps!.n).toEqual(1587616380059n);


  numberProps = tsc.get(34n);
  expect(numberProps!.n).toEqual(2008712361407n);
  numberProps = tsc.get(35n);
  expect(numberProps!.n).toEqual(2524477688477n);
  numberProps = tsc.get(36n);
  expect(numberProps!.n).toEqual(3152600884709n);
  numberProps = tsc.get(37n);
  expect(numberProps!.n).toEqual(3913443388823n);
  numberProps = tsc.get(38n);
  expect(numberProps!.n).toEqual(4830353411459n);

  // 98 in this case is the max before we exceed max safe int.
  numberProps = tsc.get(98n);
  expect(numberProps!.n).toEqual(8862058406050559n);
  expect(numberProps!.n).toBeLessThan(Number.MAX_SAFE_INTEGER);

  numberProps = tsc.get(99n);
  expect(numberProps!.n).toEqual(9607900894029917n);
  expect(numberProps!.n).toBeGreaterThan(Number.MAX_SAFE_INTEGER);
});
