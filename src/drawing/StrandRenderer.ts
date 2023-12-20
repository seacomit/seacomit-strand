import { off } from "process";
import PrimeMath from "../primes/PrimeMath";

interface NumberProperties {
  n: number,
  prime: boolean,
  factors: number[];
}

class StrandRenderer {

    numberCache: NumberProperties[] = [];

    render(ctx: CanvasRenderingContext2D, width: number, height: number, offset: number) {
        ctx.fillStyle = '#050008';//'#140033';
        ctx.fillRect(0, 0, width, height);

        ctx.font = "10px Roboto";

        const firstN = 17;
        const quantity = 100;
        const highestVisibleN = quantity + offset;
       
        // Update the cache if necessary.
        if (highestVisibleN > this.numberCache.length) {
          // calculate values up to highestVisibleN
          const startingIndex = this.numberCache.length;
          const iterations = highestVisibleN - this.numberCache.length;
          for (let i = 0; i < iterations; i++) {
            const triN = firstN + PrimeMath.triangularN(startingIndex + i) * 2;
            const factors = PrimeMath.getPrimeFactors(triN);
            const numberProperties = {
              n: triN,
              prime: factors.length === 1,
              factors: factors,
            };
            this.numberCache.push(numberProperties);
          }
        }

        const sectionLength = width / quantity;
        const circleRadius = sectionLength * 1/3;
        const gapBetweenN = sectionLength * 2/3;

        // Draw strand paths.
        ctx.lineWidth = 8;

        let startsBelow = false;
        for (let p = 0; p < highestVisibleN; p++) {
          const triN = this.numberCache[p].n;
          let currentLoop = startsBelow;
          const sqrInc = p * 2 + 1; // 1, 3, 5, 7, 9, 11, 13...
          for (let i = 0; i < 50; i++) {
            const multipleOffset = triN * sectionLength * i;
            
            const largeArcSize = triN - sqrInc;
            
            const laMiddlePoint = sectionLength * largeArcSize / 2;
            const centeredOffset = sectionLength / 2 + circleRadius / 2;
            const offsetOffset = sectionLength * offset * -1;
            const triangularOffset = sectionLength * p;
            const finalOffset = laMiddlePoint + multipleOffset + centeredOffset + offsetOffset + triangularOffset;
  
            let color = startsBelow ? "#00330088" : "#33003388";
            let startAngle = currentLoop ? 0 : Math.PI;
            let endAngle = currentLoop ? Math.PI : Math.PI * 2;
            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.arc(
                finalOffset, 
                height / 2, 
                sectionLength * largeArcSize / 2, 
                startAngle, endAngle
            );
            ctx.stroke();
            
            color = currentLoop ? "#33000088" : "#00003388";
            color = currentLoop ? "#ff338588" : "#ff338588";
            currentLoop = !currentLoop;
            startAngle = currentLoop ? 0 : Math.PI;
            endAngle = currentLoop ? Math.PI : Math.PI * 2;

            const smallArcSize = sqrInc;
            const saMiddlePoint = sectionLength * smallArcSize / 2;

            ctx.strokeStyle = color;
            ctx.beginPath();
            ctx.arc(
                saMiddlePoint + multipleOffset + centeredOffset + offsetOffset + triangularOffset + sectionLength * largeArcSize, 
                height / 2, 
                sectionLength * smallArcSize / 2, 
                startAngle, endAngle
            );
            ctx.stroke();

            currentLoop = !currentLoop;
          }
          startsBelow = !startsBelow;
        }

        // Draw points and text.
        ctx.lineWidth = 2;
        for (let i = 0; i < quantity; i++) {
            const pseudoN = offset + i;
            const numberProperties = this.numberCache[offset + i];
            const theN = numberProperties.n;
            const factors = numberProperties.factors;
            const isPrime = numberProperties.prime;
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
            ctx.fillText(displayText, 0, 0);
            ctx.restore();

            const pseudoNMod = pseudoN % firstN + 1;
            const pseudoNDisplayText = pseudoN + " (" + pseudoNMod +")";
            textMetrics = ctx.measureText(pseudoNDisplayText);
            ctx.save();
            ctx.translate(numberScreenPosition -3, height / 2 - textMetrics.width / 2 - circleRadius * 3);
            ctx.rotate(Math.PI/2);
            ctx.textAlign = "center";
            ctx.fillText(pseudoNDisplayText, 0, 0);
            ctx.restore();
            
        }

    }
}

export default StrandRenderer;
