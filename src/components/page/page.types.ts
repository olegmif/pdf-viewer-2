import {PDFDocumentProxy} from "pdfjs-dist";

export interface PageComponentProps {
    pdf: PDFDocumentProxy;
    pageNumber: number;
    render?: boolean;
    onRender: (pageNumber: number) => void;
    parentScrollTop: number;
    parentClientHeight: number;
    onVisible: (pageNumber: number) => void;
    scale: number;
}