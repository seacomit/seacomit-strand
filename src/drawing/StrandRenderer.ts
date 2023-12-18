import PrimeMath from "../primes/PrimeMath";

class StrandRenderer {

    drawArc(ctx: CanvasRenderingContext2D, gapMultiplier: number, radiusMultiplier: number, startAngle: number, endAngle: number, strokeStyle: string, gapBetweenN: number, circleRadius: number, height: number): void {
      const diameter = circleRadius * 2;  
      
      ctx.strokeStyle = strokeStyle;
        ctx.beginPath();
        ctx.arc(
            gapBetweenN + (gapBetweenN * gapMultiplier) + (diameter * gapMultiplier) + diameter * radiusMultiplier, 
            height / 2, 
            diameter * radiusMultiplier, 
            startAngle, 
            endAngle
        );
        ctx.stroke();
    }

    drawTopArc(ctx: CanvasRenderingContext2D, gapMultiplier: number, radiusMultiplier: number, strokeStyle: string, gapBetweenN: number, circleRadius: number, height: number): void {
      this.drawArc(ctx, gapMultiplier, radiusMultiplier, Math.PI, Math.PI * 2, strokeStyle, gapBetweenN, circleRadius, height);
    }

    drawBottomArc(ctx: CanvasRenderingContext2D, gapMultiplier: number, radiusMultiplier: number, strokeStyle: string, gapBetweenN: number, circleRadius: number, height: number): void {
      this.drawArc(ctx, gapMultiplier, radiusMultiplier, 0, Math.PI, strokeStyle, gapBetweenN, circleRadius, height);
    }

    render(ctx: CanvasRenderingContext2D, width: number, height: number, offset: number) {
        ctx.fillStyle = '#140033';
        ctx.fillRect(0, 0, width, height);

        ctx.font = "10px Roboto";

        const firstN = 41;
        const quantity = 100;

        const sectionLength = width / quantity;

        const circleRadius = sectionLength * 1/3;
        const gapBetweenN = sectionLength * 2/3;
        //const sectionLength = circleRadius * 2 + gapBetweenN;
        //const nWidth = (width - width % sectionLength) / sectionLength;

        // Draw strand paths.
        ctx.lineWidth = 4;

        for (let i = 0; i < 10; i++) {
          let triN = firstN;
          this.drawTopArc(ctx, i, triN, "#33003388", gapBetweenN, circleRadius, height);
        }

        /*for (let i = 0; i < firstN; i++) {
          let triN = firstN + PrimeMath.triangularN(offset + i) * 2;
          if (i % 2 == 1) {
            this.drawBottomArc(ctx, i, triN - (1 + 2 * (i + offset)), "#00330088", gapBetweenN, circleRadius, height);
            this.drawBottomArc(ctx, i, triN, "#00330088", gapBetweenN, circleRadius, height);
          } else {
            this.drawTopArc(ctx, i, triN - (1 + 2 * (i + offset)), "#33003388", gapBetweenN, circleRadius, height);
            this.drawTopArc(ctx, i, triN, "#33003388", gapBetweenN, circleRadius, height);
          }
        }*/

        // Draw points and text.
        ctx.lineWidth = 2;
        for (let i = 0; i < quantity; i++) {
            const pseudoN = offset + i + 1;
            const theN = firstN + PrimeMath.triangularN(offset + i) * 2;
            const factors = PrimeMath.getPrimeFactors(theN);
            const isPrime = factors.length === 1;
            const numberScreenPosition = i * sectionLength + gapBetweenN;

            // Draw number circle.
            ctx.beginPath();
            ctx.arc(numberScreenPosition, height / 2, circleRadius, 0, 2 * Math.PI);
            ctx.strokeStyle = "#4dffb8";
            if (isPrime) {
                ctx.fillStyle = "#3385ff";
            } else {
                ctx.fillStyle = "#ff3385";
            }
            ctx.fill();
            ctx.stroke();
            
            // Draw number text.
            let displayText = theN + " (" + factors.toString() + ")";
            if (isPrime) {
                displayText = theN.toString();
            }
            let textMetrics = ctx.measureText(displayText);
            ctx.save();
            ctx.translate(numberScreenPosition -3, height / 2 + textMetrics.width / 2 + circleRadius * 3);
            ctx.rotate(Math.PI/2);
            ctx.textAlign = "center";
            //ctx.fillText(theN.toString(), numberScreenPosition - (textMetrics.width / 2), height / 2 + 20);
            ctx.fillText(displayText, 0, 0);
            ctx.restore();

            textMetrics = ctx.measureText(pseudoN.toString());
            ctx.save();
            ctx.translate(numberScreenPosition -3, height / 2 - textMetrics.width / 2 - circleRadius * 3);
            ctx.rotate(Math.PI/2);
            ctx.textAlign = "center";
            //ctx.fillText(theN.toString(), numberScreenPosition - (textMetrics.width / 2), height / 2 + 20);
            ctx.fillText(pseudoN.toString(), 0, 0);
            ctx.restore();
            
        }

    }
}

export default StrandRenderer;
