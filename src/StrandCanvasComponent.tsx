import { Component, createRef } from 'react';
import StrandRenderer from './drawing/StrandRenderer';
import NumberLineStrand from './drawing/NumberLineStrand';
import TriangularStrand from './drawing/TriangularStrand';

interface StrandCanvasComponentProps {
  width: number;
  height: number;
  offset: number;
}

class StrandCanvasComponent extends Component<StrandCanvasComponentProps> {
  canvasRef = createRef<HTMLCanvasElement>();
  strandRenderer = new StrandRenderer();
  strand = new TriangularStrand(11n, 6n, new TriangularStrand(11n, 2n, new NumberLineStrand()));

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
      const {width, height, offset} = this.props;
      canvas.width = width;
      canvas.height = height;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        this.strandRenderer.render(this.strand, ctx, canvas.width, canvas.height, offset);
      }
    }
  }
}

export default StrandCanvasComponent;
