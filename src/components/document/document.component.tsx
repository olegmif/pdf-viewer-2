import React, {FC, useEffect, useMemo, useRef, useState} from 'react';
import {DocumentComponentProps} from "./document.types";
import Page from "../page/page.component";
import styles from "./document.module.scss";

const DocumentComponent: FC<DocumentComponentProps> = ({pdf, scale = 1, page}) => {
    const documentRef = useRef<HTMLDivElement>(null);
    const pages = useMemo(() => Array.from({length: pdf.numPages}, (v, i) => i + 1), [pdf]);
    const [scrollTop, setScrollTop] = useState<number>(0);
    const [scrollHeight, setScrollHeight] = useState<number>(0);
    const [visiblePages, setVisiblePages] = useState<number[]>([]);


    useEffect(()=>{
        setVisiblePages([page]);
        scrollToPage(page);
    }, [page, documentRef])

    const scrollToPage = (page: number) => {
        if (documentRef.current && page > 0 && page <= pdf.numPages) {
            documentRef.current.children[page-1].scrollIntoView();
        }
    }

    const handlePageRender = (page: number) => {
        // setRenderPage(page + 1);
    }

    const handleScroll: React.UIEventHandler<HTMLDivElement> = (e) => {
        setScrollTop(e.currentTarget.scrollTop);
        setScrollHeight(e.currentTarget.clientHeight);
    }

    const handleVisible = (pageNumber: number) => {
        if (!visiblePages.includes(pageNumber)) {
            setVisiblePages([...visiblePages, pageNumber])
        }
    }

    return (
        <div ref={documentRef} className={styles.document} onScroll={handleScroll}>
            {pages.map(page => <Page key={page} pdf={pdf} pageNumber={page} render={visiblePages.includes(page)}
                                     onRender={handlePageRender} parentScrollTop={scrollTop}
                                     parentClientHeight={scrollHeight} onVisible={handleVisible} scale={scale}/>)}
        </div>
    );
};

export default DocumentComponent;