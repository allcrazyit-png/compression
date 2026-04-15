import React, { useState } from 'react';
import DropZone from './components/DropZone';
import ImagePreview from './components/ImagePreview';
import { compressImage, TARGET_MAX_SIZE_MB } from './utils/compressor';
import JSZip from 'jszip';
import { compressPDF } from './utils/pdfCompressor';

function App() {
  const [files, setFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageSelected = async (newFiles) => {
    setIsProcessing(true);

    // Create initial state for new files
    const newFileEntries = newFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      original: file,
      compressed: null,
      status: 'pending', // pending, compressing, done, error
      progress: null,
      error: null
    }));

    setFiles(prev => [...prev, ...newFileEntries]);

    // Process files one by one (or could be parallel)
    for (let entry of newFileEntries) {
      try {
        setFiles(prev => prev.map(f => f.id === entry.id ? { ...f, status: 'compressing' } : f));

        let compressed;
        if (entry.original.type === 'application/pdf') {
          compressed = await compressPDF(entry.original, {
            maxSizeMB: TARGET_MAX_SIZE_MB,
            onProgress: (current, total) => {
              setFiles(prev => prev.map(f => f.id === entry.id ? { ...f, progress: `${current}/${total}` } : f));
            }
          });
        } else {
          compressed = await compressImage(entry.original, { maxSizeMB: TARGET_MAX_SIZE_MB });
        }

        setFiles(prev => prev.map(f => f.id === entry.id ? { ...f, compressed, status: 'done', progress: null } : f));
      } catch (error) {
        console.error(error);
        setFiles(prev => prev.map(f => f.id === entry.id ? { ...f, status: 'error', error: error.message || '處理失敗' } : f));
      }
    }

    setIsProcessing(false);
  };

  const handleReset = () => {
    if (window.confirm('確定要清除所有圖片嗎？')) {
      setFiles([]);
    }
  };

  const handleRemove = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleDownloadAll = async () => {
    const processedFiles = files.filter(f => f.status === 'done' && f.compressed);

    if (processedFiles.length === 0) return;

    // If only one file, download it directly
    if (processedFiles.length === 1) {
      const f = processedFiles[0];
      const link = document.createElement('a');
      link.href = URL.createObjectURL(f.compressed);
      link.download = f.original.name;
      link.click();
      return;
    }

    // If multiple files, zip them
    const zip = new JSZip();
    processedFiles.forEach(f => {
      zip.file(f.original.name, f.compressed);
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'compressed_images.zip';
    link.click();
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ padding: '2rem 1rem 3rem', textAlign: 'center' }}>
        <h1 className="title">ImagePress</h1>
        <p className="subtitle">極簡、快速、隱私。批量壓縮圖片與 PDF。</p>
      </header>

      <main style={{ flex: 1, padding: '0 1rem', paddingBottom: '4rem', maxWidth: '1000px', margin: '0 auto', width: '100%' }}>
        {files.length === 0 ? (
          <div className="animate-fade-in">
            <DropZone onImageSelected={handleImageSelected} />
          </div>
        ) : (
          <div className="animate-fade-in">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                圖片清單 ({files.length})
                {isProcessing && <span style={{ fontSize: '1rem', fontWeight: 400, color: 'var(--color-text-secondary)', marginLeft: '10px' }}>處理中...</span>}
              </h2>
              <button onClick={handleReset} style={{ color: 'var(--color-text-secondary)' }}>清除全部</button>
            </div>

            <ImagePreview
              files={files}
              onRemove={handleRemove}
              onDownloadAll={handleDownloadAll}
            />

            <div style={{ marginTop: '2rem' }}>
              <DropZone onImageSelected={handleImageSelected} />
            </div>
          </div>
        )}
      </main>

      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--color-text-secondary)', fontSize: '0.875rem' }}>
        <p>所有處理皆在瀏覽器端完成，您的圖片/PDF 不會上傳至伺服器。</p>
        <p style={{ marginTop: '0.5rem', fontSize: '0.75rem', opacity: 0.6 }}>Version v4.0.1</p>
      </footer>
    </div>
  );
}

export default App;
