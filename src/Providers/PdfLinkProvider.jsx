import { useState } from "react";
import { createContext } from "react";

export const pdfContext = createContext()

const PdfLinkProvider = ({children}) => {
    const [booklink, setBookLink] = useState("");

    return (
        <pdfContext.Provider value={[booklink,setBookLink]}>
            {children}
        </pdfContext.Provider>
    );
};

export default PdfLinkProvider;