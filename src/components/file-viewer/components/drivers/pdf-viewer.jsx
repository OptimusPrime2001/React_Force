import React from 'react';

import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist';
// import pdfWorker from 'pdfjs-dist/build/pdf.worker?worker';
import * as pdfjs from "pdfjs-dist/webpack";
pdfjs.GlobalWorkerOptions.workerSrc = new URL("pdfjs-dist/build/pdf.worker.min.js", import.meta.url).toString();

// Cấu hình worker
// GlobalWorkerOptions.workerSrc = pdfWorker;

export default function PDFViewer({ filePath }) {
  const canvasRef = React.useRef(null);
  const [pdf, setPdf] = React.useState(null);

  React.useEffect(() => {
    if (!filePath) return;

    getDocument(filePath).promise.then(setPdf);
  }, [filePath]);

  React.useEffect(() => {
    if (!pdf) return;

    pdf.getPage(1).then((page) => {
      const viewport = page.getViewport({ scale: 1.5 });
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      page.render({ canvasContext: context, viewport });
    });
  }, [pdf]);

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}
