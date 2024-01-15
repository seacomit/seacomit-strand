import NumberLineStrand from './NumberLineStrand';

test('Number line strand can be constructed.', () => {
  const nls = new NumberLineStrand();
});

test('Number line strand loads numbers correctly.', () => {
  const nls = new NumberLineStrand();
  nls.loadUpTo(99, () => {}); 
  expect(nls.numberLine.length).toEqual(100);
  expect(nls.numberCache.size).toEqual(100);

  for (let i = 0n; i < 100n; i++) {
    const numberProps = nls.get(i);
    expect(numberProps!.n).toEqual(i);
  }
  expect(nls.numberLine.length).toEqual(100);
  expect(nls.numberCache.size).toEqual(100);
});

test('Number line returns numbers correctly.', () => {
  const nls = new NumberLineStrand();

  for (let i = 0n; i < 99n; i++) {
    const numberProps = nls.get(i);
    expect(numberProps!.n).toEqual(i);
  }
  expect(nls.numberCache.size).toEqual(99);
  expect(nls.numberLine.length).toEqual(0);
});
