import PrimeMath from '../primes/PrimeMath';
import TriangularStrand from './TriangularStrand';

test('TriangularStrand can be constructed.', () => {
  const ts = new TriangularStrand(11, 2);
});

test('TriangularStrand loads numbers correctly.', () => {
  const ts = new TriangularStrand(11, 2);
  ts.loadUpTo(99); 
  
  for (let i = 0; i < 99; i++) {
    const numberProps = ts.get(i);
    expect(numberProps.n).toEqual(11 + PrimeMath.triangularN(i) * 2);
  }
});

test('Number line returns numbers correctly.', () => {
    const ts = new TriangularStrand(11, 2);

    for (let i = 0; i < 99; i++) {
        const numberProps = ts.get(i);
        expect(numberProps.n).toEqual(11 + PrimeMath.triangularN(i) * 2);
      }
  });
  