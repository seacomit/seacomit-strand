import NumberLineStrand from './NumberLineStrand';

test('Number line strand can be constructed.', () => {
  const nls = new NumberLineStrand();
});

test('Number line strand loads numbers correctly.', () => {
  const nls = new NumberLineStrand();
  nls.loadUpTo(99); 
  
  for (let i = 0; i < 99; i++) {
    const numberProps = nls.get(i);
    expect(numberProps.n).toEqual(i);
  }
});

test('Number line returns numbers correctly.', () => {
    const nls = new NumberLineStrand();

    for (let i = 0; i < 99; i++) {
      const numberProps = nls.get(i);
      expect(numberProps.n).toEqual(i);
    }
  });
  