import React, {FC, useState} from 'react';
import {PDFViewerComponentProps} from "./pdf-viewer.types";
import Document from "../document/document.component";
import styles from "./pdf-viewer.module.scss";
import Panel from "../panel/panel.component";
import {EMoveToNear} from "../panel/panel.types";

const PdfViewerComponent: FC<PDFViewerComponentProps> = ({loadingState, pdf}) => {

    const [scale, setScale] = useState<number>(1);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const handleScale = (scale: number) => {
        setScale(scale)
    }

    const handleMoveToNear = (to: EMoveToNear) => {
        if (to === EMoveToNear.next) {
            if (pdf?.numPages && currentPage < pdf.numPages) {
                setCurrentPage(currentPage + 1);
            }
        } else {
            if (currentPage > 1) {
                setCurrentPage(currentPage - 1)
            };
        }
    }

    if (pdf) {
        return (
            <div className={styles.viewer}>
                <Document pdf={pdf} scale={scale} page={currentPage}/>
                <Panel scale={scale} onScale={handleScale} onMoveToNear={handleMoveToNear}/>
            </div>
        )
    }

    return null;
};

export default PdfViewerComponent;