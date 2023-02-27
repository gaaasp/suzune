import * as PDFJS from "pdfjs-dist/legacy/build/pdf";

PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${PDFJS.version}/pdf.worker.min.js`;

export async function renderPDF(data: ArrayBuffer, container: HTMLElement) {
    let currPage = 1;
    let numPages = 0;
    let thePDF: PDFJS.PDFDocumentProxy;

    return PDFJS.getDocument(data).promise.then(async (pdf) => {
            thePDF = pdf;
            numPages = pdf.numPages;
            return pdf.getPage(1).then(handlePages);
    });

    async function handlePages(page: PDFJS.PDFPageProxy): Promise<HTMLElement> {
        let viewport = page.getViewport({ scale: 1 });

        let canvas = document.createElement("canvas");
        canvas.className = "block w-full";
        let context = canvas.getContext('2d') as CanvasRenderingContext2D;
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({ canvasContext: context, viewport: viewport }).promise;

        container.appendChild(canvas);

        currPage++;
        if (thePDF !== null && currPage <= numPages) {
            return thePDF.getPage(currPage).then(handlePages);
        } else {
            return container;
        }
    }
}
