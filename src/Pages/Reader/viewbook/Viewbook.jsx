import React, { useCallback, useState } from 'react';
import { useResizeObserver } from '@wojtekmaj/react-hooks';
import { pdfjs, Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import samplepdf from "../../../assets/Spoken-English.pdf";
import './Viewbook.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/',
};

const resizeObserverOptions = {};

const maxWidth = 800;

export default function Viewbook() {
  const [file, setFile] = useState(samplepdf);
  const [numPages, setNumPages] = useState();
  const [containerRef, setContainerRef] = useState(null);
  const [containerWidth, setContainerWidth] = useState();
  const [zoom, setZoom] = useState(1);
  const [pageNumber, setPageNumber] = useState(1);

  const onResize = useCallback((entries) => {
    const [entry] = entries;

    if (entry) {
      setContainerWidth(entry.contentRect.width);
    }
  }, []);

  useResizeObserver(containerRef, resizeObserverOptions, onResize);

  function onDocumentLoadSuccess({ numPages: nextNumPages }) {
    setNumPages(nextNumPages);
  }

  function handleZoomChange(event) {
    setZoom(parseFloat(event.target.value));
  }

  function handlePageNumberChange(event) {
    setPageNumber(parseInt(event.target.value, 10));
  }

  function goToPreviousPage() {
    if (pageNumber > 1) {
      setPageNumber(pageNumber - 1);
    }
  }

  function goToNextPage() {
    if (pageNumber < numPages) {
      setPageNumber(pageNumber + 1);
    }
  }

  return (
    <div className="Example">
      <div className="Example__container">
        <div className="Example__container__controls">
          <label htmlFor="zoom">Zoom:</label>
          <input
            id="zoom"
            type="number"
            step="0.1"
            min="0.1"
            max="3"
            value={zoom}
            onChange={handleZoomChange}
          />
          <label htmlFor="pageNumber">Page Number:</label>
          <input
            id="pageNumber"
            type="number"
            min="1"
            max={numPages}
            value={pageNumber}
            onChange={handlePageNumberChange}
          />
          <button onClick={goToPreviousPage}>Previous Page</button>
          <button onClick={goToNextPage}>Next Page</button>
        </div>
        <div className="Example__container__document" ref={setContainerRef}>
          <Document file={file} onLoadSuccess={onDocumentLoadSuccess} options={options}>
            <Page
              pageNumber={pageNumber}
              scale={zoom}
              width={containerWidth ? Math.min(containerWidth, maxWidth) : maxWidth}
            />
          </Document>
        </div>
      </div>
    </div>
  );
}
