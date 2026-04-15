import * as pdfjsLib from 'pdfjs-dist';
import { jsPDF } from 'jspdf';
import { compressImage, TARGET_MAX_SIZE_BYTES, TARGET_MAX_SIZE_MB } from './compressor';

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
        const maxSizeBytes = Math.round((options.maxSizeMB ?? TARGET_MAX_SIZE_MB) * 1024 * 1024);

        const attempts = [
            { scale: 1.5, jpegQuality: 0.82, imageMaxSizeMB: options.maxSizeMB ?? TARGET_MAX_SIZE_MB },
            { scale: 1.25, jpegQuality: 0.72, imageMaxSizeMB: Math.min(options.maxSizeMB ?? TARGET_MAX_SIZE_MB, TARGET_MAX_SIZE_BYTES / 1024 / 1024 / 2) },
            { scale: 1.0, jpegQuality: 0.62, imageMaxSizeMB: Math.min(options.maxSizeMB ?? TARGET_MAX_SIZE_MB, TARGET_MAX_SIZE_BYTES / 1024 / 1024 / 3) },
            { scale: 0.85, jpegQuality: 0.5, imageMaxSizeMB: Math.min(options.maxSizeMB ?? TARGET_MAX_SIZE_MB, TARGET_MAX_SIZE_BYTES / 1024 / 1024 / 4) }
        ];

        let bestBlob = null;

        for (const attempt of attempts) {
            const compressedBlob = await renderCompressedPdf(pdfDoc, numPages, {
                onProgress,
                scale: attempt.scale,
                jpegQuality: attempt.jpegQuality,
                imageMaxSizeMB: attempt.imageMaxSizeMB,
                transformImageBlob: options.transformImageBlob
            });

            if (!bestBlob || compressedBlob.size < bestBlob.size) {
                bestBlob = compressedBlob;
            }

            if (compressedBlob.size <= maxSizeBytes) {
                return compressedBlob;
            }
        }

        return bestBlob;
    } catch (error) {
        console.error("PDF Compression failed:", error);
        throw error;
    }
};

const renderCompressedPdf = async (pdfDoc, numPages, options) => {
    const { onProgress, scale, jpegQuality, imageMaxSizeMB, transformImageBlob } = options;
    let doc = null;

    for (let i = 1; i <= numPages; i++) {
        if (onProgress) onProgress(i, numPages);
        const page = await pdfDoc.getPage(i);

        const viewport = page.getViewport({ scale });

        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;

        await page.render({
            canvasContext: context,
            viewport: viewport
        }).promise;

        const blob = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', jpegQuality));

        let compressedImageBlob = await compressImage(blob, {
            fileType: 'image/jpeg',
            maxSizeMB: imageMaxSizeMB,
            initialQuality: jpegQuality,
            useWebWorker: true
        });

        if (transformImageBlob) {
            compressedImageBlob = await transformImageBlob(compressedImageBlob, i, numPages);
        }

        const compressedDataUrl = await new Promise(resolve => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(compressedImageBlob);
        });

        const width = viewport.width / scale;
        const height = viewport.height / scale;
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

        doc.addImage(compressedDataUrl, 'JPEG', 0, 0, mmWidth, mmHeight, undefined, 'FAST');
    }

    return doc.output('blob');
};
