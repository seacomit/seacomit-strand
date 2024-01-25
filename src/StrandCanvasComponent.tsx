import { useEffect, useRef, useState } from 'react';
import NumberLineRenderer from './drawing/NumberLineRenderer';
import IStrand from './drawing/IStrand';

type StrandCanvasComponentProps = {
  width: number;
  height: number;
  offset: number;
  strand: IStrand;
};

export default function StrandCanvasComponent({width,  height,  offset,  strand}: StrandCanvasComponentProps) {
  const [numberLineRenderer, setNumberLineRenderer] = useState(new NumberLineRenderer());
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (canvas) {
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        if (strand.getLine().length > 0) {
          numberLineRenderer.render(strand.getLine(), offset, ctx, width, height);
        }
      }
    }
  }, [width, height, offset, strand]);

  return <canvas ref={ref} data-testid="strand-canvas" />;
};
