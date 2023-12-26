import { Component, createRef } from 'react';
import NumberLineRenderer from './drawing/NumberLineRenderer';
import IStrand from './drawing/IStrand';

interface StrandCanvasComponentProps {
  width: number;
  height: number;
  offset: number;
  strand: IStrand;
}

class StrandCanvasComponent extends Component<StrandCanvasComponentProps> {
  canvasRef = createRef<HTMLCanvasElement>();
  numberLineRenderer = new NumberLineRenderer();

  render() {
    return <canvas ref={this.canvasRef} data-testid="strand-canvas" />;
  }

  componentDidMount(): void {
    this.redrawStrand();
  }

  componentDidUpdate(): void {
    this.redrawStrand();
  }

  redrawStrand() {
    const canvas = this.canvasRef.current;
    if (canvas) {
      const {width, height, offset, strand} = this.props;
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.numberLineRenderer.render(strand.getLine(), offset, ctx, canvas.width, canvas.height);
      }
    }
  }
}

export default StrandCanvasComponent;
