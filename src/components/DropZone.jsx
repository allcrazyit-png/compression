import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { compressImage, formatSize } from '../utils/compressor';

const DropZone = ({ onImageSelected }) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            processFiles(files);
        }
    };

    const handleFileSelect = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            processFiles(files);
        }
    };

    const processFiles = (fileList) => {
        const validFiles = Array.from(fileList).filter(file =>
            file.type.startsWith('image/') || file.type === 'application/pdf'
        );
        if (validFiles.length === 0) {
            alert('請上傳圖片或 PDF 檔案');
            return;
        }
        onImageSelected(validFiles);
    };

    return (
        <div
            className={`drop-zone glass-panel ${isDragOver ? 'drag-over' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current.click()}
            style={{
                padding: '3rem',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                border: isDragOver ? '2px solid var(--color-accent)' : '1px solid rgba(255,255,255,0.3)',
                transform: isDragOver ? 'scale(1.02)' : 'scale(1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: '300px',
                maxWidth: '600px',
                margin: '0 auto'
            }}
        >
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*,application/pdf"
                multiple
                onChange={handleFileSelect}
            />

            <div style={{
                marginBottom: '1.5rem',
                color: isDragOver ? 'var(--color-accent)' : 'var(--color-text-secondary)',
                transition: 'color 0.3s ease'
            }}>
                {isDragOver ? <Upload size={64} strokeWidth={1.5} /> : <ImageIcon size={64} strokeWidth={1} />}
            </div>

            <h3 style={{
                fontSize: '1.5rem',
                fontWeight: 600,
                marginBottom: '0.5rem',
                color: 'var(--color-text-primary)'
            }}>
                拖放圖片至此，或點擊上傳
            </h3>

            <p style={{ color: 'var(--color-text-secondary)' }}>
                支援 JPG, PNG, WEBP, PDF (壓縮至 500KB，維持原檔名)
            </p>
        </div>
    );
};

export default DropZone;
