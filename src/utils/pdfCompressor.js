import * as pdfjsLib from 'pdfjs-dist';
import { jsPDF } from 'jspdf';
import { compressImage } from './compressor';

// Initialize PDF.js worker
import pdfWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Initialize PDF.js worker
// We use the local worker from node_modules via Vite's ?url import
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const compressPDF = async (pdfFile, options = {}) => {
    const { onProgress } = options;
    try {
        const arrayBuffer = await pdfFile.arrayBuffer();
        const pdfDoc = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        const numPages = pdfDoc.numPages;

        // Create a new PDF with jsPDF
        // We'll set the orientation/format based on the first page later
        let doc = null;

        for (let i = 1; i <= numPages; i++) {
            if (onProgress) onProgress(i, numPages);
            const page = await pdfDoc.getPage(i);

            // Render at a decent scale for quality (e.g. 1.5 or 2.0)
            // Lower scale = smaller size but blurrier text
            const scale = 1.5;
            const viewport = page.getViewport({ scale });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            await page.render({
                canvasContext: context,
                viewport: viewport
            }).promise;

            // Convert canvas to Blob
            const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.95));

            // Compress the image
            // We force JPEG here to ensure size reduction for the PDF pages
            const compressedImageBlob = await compressImage(blob, {
                fileType: 'image/jpeg',
                ...options
            });

            // Get image data for jsPDF
            const compressedDataUrl = await new Promise(resolve => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(compressedImageBlob);
            });

            // Initialize doc if first page
            const width = viewport.width / scale; // Original PDF point size
            const height = viewport.height / scale;
            // Convert points to mm roughly (1 pt = 0.352778 mm)
            const mmWidth = width * 0.352778;
            const mmHeight = height * 0.352778;

            const orientation = width > height ? 'l' : 'p';

            if (!doc) {
                doc = new jsPDF({
                    orientation,
                    unit: 'mm',
                    format: [mmWidth, mmHeight]
                });
            } else {
                doc.addPage([mmWidth, mmHeight], orientation);
            }

            // Add image to PDF
            // x, y, w, h
            doc.addImage(compressedDataUrl, 'JPEG', 0, 0, mmWidth, mmHeight, undefined, 'FAST');
        }

        return doc.output('blob');

    } catch (error) {
        console.error("PDF Compression failed:", error);
        throw error;
    }
};
