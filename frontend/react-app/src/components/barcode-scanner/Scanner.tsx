import { useEffect } from "react";
import styled from "styled-components";
import config from "./config.json";
// @ts-ignore
import Quagga from "quagga";

// Styled-components for Scanner
const ScannerContainer = styled.div`
  position: relative;
  width: 400px;
  height: 300px;

  canvas,
  video {
    width: 400px;
    height: 300px;
    position: absolute;
    top: 0;
    left: 0;
  }

  canvas.drawingBuffer,
  video.drawingBuffer {
    width: 400px;
    height: 300px;
  }
`;

const Scanner = (props: any) => {
  const { onDetected } = props;

  useEffect(() => {
    Quagga.init(config, (err: any) => {
      if (err) {
        console.log(err, "error msg");
      }
      Quagga.start();
      return () => {
        Quagga.stop();
      };
    });

    // Detecting boxes on stream
    Quagga.onProcessed((result: any) => {
      const drawingCtx = Quagga.canvas.ctx.overlay,
        drawingCanvas = Quagga.canvas.dom.overlay;

      if (result) {
        if (result.boxes) {
          drawingCtx.clearRect(
            0,
            0,
            Number(drawingCanvas.getAttribute("width")),
            Number(drawingCanvas.getAttribute("height"))
          );
          result.boxes
            .filter((box: any) => box !== result.box)
            .forEach((box: any) => {
              Quagga.ImageDebug.drawPath(box, { x: 0, y: 1 }, drawingCtx, {
                color: "green",
                lineWidth: 2,
              });
            });
        }

        if (result.box) {
          Quagga.ImageDebug.drawPath(result.box, { x: 0, y: 1 }, drawingCtx, {
            color: "#00F",
            lineWidth: 2,
          });
        }

        if (result.codeResult && result.codeResult.code) {
          Quagga.ImageDebug.drawPath(
            result.line,
            { x: "x", y: "y" },
            drawingCtx,
            { color: "red", lineWidth: 3 }
          );
        }
      }
    });

    Quagga.onDetected(detected);
  }, []);

  const detected = (result: any) => {
    console.log(result);
    console.log(result.codeResult.code);
    onDetected(result.codeResult.code);
  };

  return <ScannerContainer id="interactive" className="viewport" />;
};

export default Scanner;
