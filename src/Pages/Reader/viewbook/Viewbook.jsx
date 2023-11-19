import { useCallback, useState } from "react";


export default function Viewbook() {
  const [pdfLink, setPdfLink] = useState(
    "https://firebasestorage.googleapis.com/v0/b/book-valley-72490.appspot.com/o/pdf%2FReact%20Hooks%201a6f2b14c8e24032bc4bdee87bab9d51.pdfb6edc9b7-2894-4f90-bd52-f960e89fc1b6?alt=media&token=42f8c3fc-f58d-4843-8a68-1c1dc1f7cb47"
  );

  return (
    <embed src={pdfLink}
    width="100%"
    height="600px"
     />
        
       
  );
}

