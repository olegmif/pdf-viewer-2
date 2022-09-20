import {PDFDocumentProxy} from "pdfjs-dist";

export interface DocumentComponentProps {
    pdf: PDFDocumentProxy;
    scale?: number;
    page: number;
}