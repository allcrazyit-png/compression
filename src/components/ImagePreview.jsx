import React from 'react';
import { Download, X, FileImage, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { formatSize } from '../utils/compressor';

const ImageItem = ({ fileEntry, onRemove }) => {
    const { original, compressed, status, error } = fileEntry;

    // Calculate savings
    const savings = compressed
        ? ((original.size - compressed.size) / original.size * 100).toFixed(0)
        : 0;

    const previewUrl = compressed ? URL.createObjectURL(compressed) : URL.createObjectURL(original);

    return (
        <div className="glass-panel" style={{
            padding: '1rem',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            position: 'relative'
        }}>
            {/* Thumbnail */}
            <div style={{ width: '60px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0, backgroundColor: '#eee' }}>
                <img src={previewUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            {/* Info */}
            <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 500, truncate: true, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {original.name}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {formatSize(original.size)}
                    {compressed && (
                        <>
                            ➝ <span style={{ color: 'var(--color-accent)', fontWeight: 600 }}>{formatSize(compressed.size)}</span>
                            <span style={{ backgroundColor: 'rgba(0,113,227,0.1)', color: 'var(--color-accent)', padding: '0 6px', borderRadius: '4px', fontSize: '0.75rem' }}>-{savings}%</span>
                        </>
                    )}
                </div>
            </div>

            {/* Status / Actions */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                {status === 'compressing' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {fileEntry.progress && <span style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>{fileEntry.progress}</span>}
                        <Loader2 className="animate-spin" size={20} color="var(--color-text-secondary)" />
                    </div>
                )}
                {status === 'error' && <AlertCircle size={20} color="#ff3b30" />}

                {status === 'done' && (
                    <button
                        onClick={() => {
                            const link = document.createElement('a');
                            link.href = URL.createObjectURL(compressed);
                            link.download = `compressed_${original.name}`;
                            link.click();
                        }}
                        style={{
                            padding: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'rgba(0,0,0,0.05)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        title="下載此張"
                    >
                        <Download size={18} />
                    </button>
                )}

                <button
                    onClick={() => onRemove(fileEntry.id)}
                    style={{
                        padding: '8px',
                        color: 'var(--color-text-secondary)',
                        opacity: 0.7
                    }}
                    title="移除"
                >
                    <X size={18} />
                </button>
            </div>
        </div>
    );
};

const ImagePreview = ({ files, onRemove, onDownloadAll }) => {
    const doneCount = files.filter(f => f.status === 'done').length;
    const totalOriginalSize = files.reduce((acc, f) => acc + f.original.size, 0);
    const totalCompressedSize = files.reduce((acc, f) => acc + (f.compressed ? f.compressed.size : f.original.size), 0); // Count original if not compressed yet for rough estimate or just 0
    // Actually better to only count compressed for savings calculation
    const compressedFiles = files.filter(f => f.compressed);
    const totalSavingsBytes = compressedFiles.reduce((acc, f) => acc + (f.original.size - f.compressed.size), 0);

    return (
        <div>
            {/* Actions Bar */}
            {doneCount > 0 && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
                        已節省: {formatSize(totalSavingsBytes)}
                    </div>
                    <button
                        onClick={onDownloadAll}
                        style={{
                            padding: '0.6rem 1.2rem',
                            borderRadius: 'var(--radius-lg)',
                            backgroundColor: 'var(--color-accent)',
                            color: 'white',
                            fontSize: '0.9rem',
                            fontWeight: 500,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            boxShadow: 'var(--shadow-sm)'
                        }}
                    >
                        <Download size={16} /> 下載全部 ({doneCount})
                    </button>
                </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {files.map(fileEntry => (
                    <ImageItem key={fileEntry.id} fileEntry={fileEntry} onRemove={onRemove} />
                ))}
            </div>
        </div>
    );
};

export default ImagePreview;
