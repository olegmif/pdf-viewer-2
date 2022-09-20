import React, {FC, memo, useEffect, useLayoutEffect, useRef, useState} from 'react';
import {PageComponentProps} from "./page.types";
import styles from "./page.module.scss";
import {PDFPageProxy} from "pdfjs-dist";

enum ERenderProcess {
    started,
    ended
}

const PageComponent: FC<PageComponentProps> = ({
                                                   pdf,
                                                   pageNumber,
                                                   render,
                                                   onRender,
                                                   parentScrollTop,
                                                   parentClientHeight,
                                                   onVisible,
                                                   scale = 1,
                                               }) => {

    const renderProcess = useRef<number>(ERenderProcess.ended);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const pageRef = useRef<HTMLDivElement>(null);


    useLayoutEffect(() => {

        (async function () {
            const page: PDFPageProxy = await pdf.getPage(pageNumber);
            const viewport = page.getViewport({scale, rotation: 0});
            const canvas = canvasRef.current;

            if (canvas) {
                const canvasContext = canvas.getContext('2d') as Object;
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                const renderContext = {canvasContext, viewport, background: "#EEEEEE"};

                if (renderProcess.current === ERenderProcess.ended && renderContext && render) {
                    renderProcess.current = ERenderProcess.started;

                    await page.render(renderContext);

                    renderProcess.current = ERenderProcess.ended;
                    onRender(pageNumber);

                }
            }
        })();

    }, [pageNumber, render, scale])

    useEffect(() => {
        if (pageRef.current) {
            // начало страницы
            const pageTopOffset = pageRef.current.offsetTop;
            const pageEndOffset = pageRef.current.offsetTop + pageRef.current.offsetHeight;

            if (pageTopOffset < parentScrollTop + parentClientHeight && pageEndOffset > parentScrollTop) {
                onVisible(pageNumber);
            }
        }
    }, [parentScrollTop])


    return (
        <div ref={pageRef} className={styles.page}>
            <canvas ref={canvasRef}/>
        </div>
    );
};

export default memo(PageComponent);