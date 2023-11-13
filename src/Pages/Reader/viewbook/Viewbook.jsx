import { useCallback, useState } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import leftarrow from "../../../assets/left-arrow.png";
import rightarrow from "../../../assets/right-arrow.png";
import "./Viewbook.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const options = {
  cMapUrl: "/cmaps/",
  standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

// ... (other imports)

export default function Viewbook() {
  const [pdfLink, setPdfLink] = useState(
    "https://firebasestorage.googleapis.com/v0/b/book-valley-72490.appspot.com/o/pdf%2FReact-render%20f92b2a57056648839456f2d8a7e1a1fd.pdf570eef13-9027-4063-abbd-8e6a67027f80?alt=media&token=28054fcd-18e5-4d47-beeb-4cee5c85e457"
  );

  return (
    <div className="Example">
      <div className="Example__container">
        <div className="Example__container__document">
          <iframe
            src={pdfLink}
            title="PDF Viewer"
            width="100%"
            height="600px"
            frameBorder="0"
            allowFullScreen
            sandbox="allow-scripts allow-same-origin"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

