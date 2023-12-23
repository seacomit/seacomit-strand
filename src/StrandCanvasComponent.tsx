import { Component, createRef } from 'react';
import StrandRenderer from './drawing/StrandRenderer';
import NumberLineStrand from './drawing/NumberLineStrand';
import TriangularStrand from './drawing/TriangularStrand';
import IStrand from './drawing/IStrand';

interface StrandCanvasComponentProps {
  width: number;
  height: number;
  offset: number;
  strand: IStrand;
}

class StrandCanvasComponent extends Component<StrandCanvasComponentProps> {
  canvasRef = createRef<HTMLCanvasElement>();
  strandRenderer = new StrandRenderer();

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
        this.strandRenderer.render(strand, ctx, canvas.width, canvas.height, offset);
      }
    }
  }
}

export default StrandCanvasComponent;
