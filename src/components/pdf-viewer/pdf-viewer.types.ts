import {PDFDocumentProxy} from "pdfjs-dist/types/src/display/api";

export interface ILoadingState {
    loaded: number;
    total: number;
}

export interface PDFViewerComponentProps {
    loadingState: ILoadingState;
    pdf?: PDFDocumentProxy;
}