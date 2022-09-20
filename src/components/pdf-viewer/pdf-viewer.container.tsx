import React, {FC, useEffect, useState} from 'react';
import {PDFDocumentLoadingTask, PDFWorker} from "pdfjs-dist";
import {OnProgressParameters, PDFDocumentProxy} from "pdfjs-dist/types/src/display/api";
import PdfViewer from "./pdf-viewer.component";
import {ILoadingState} from "./pdf-viewer.types";

// const URL = 'https://www.hq.nasa.gov/alsj/a17/A17_FlightPlan.pdf';
const URL = 'example.pdf';
// const URL = 'example2.pdf';
// const URL = 'example3.pdf';

const PdfViewerContainer: FC = () => {

    const [pdf, setPdf] = useState<PDFDocumentProxy | undefined>();
    const [loadingState, setLoadingState] = useState<ILoadingState>({loaded: 0, total: 0});

    useEffect(()=>{
        (async function () {
            //@ts-ignore
            const pdfJS = await import('pdfjs-dist/build/pdf');
            pdfJS.GlobalWorkerOptions.workerSrc = `${window.location.origin}/pdf.worker.min.js`;

            const loadingTask: PDFDocumentLoadingTask = pdfJS.getDocument(URL);

            loadingTask.onProgress = function(data: OnProgressParameters) {
                setLoadingState({loaded: data.loaded, total: data.total});
            }

            setPdf(await loadingTask.promise);
        })();

    }, [])

    return (
        <div>
            <PdfViewer loadingState={loadingState} pdf={pdf}/>
        </div>
    );
};

export default PdfViewerContainer;