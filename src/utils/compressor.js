import imageCompression from 'browser-image-compression';

/**
 * 壓縮圖片至 1MB 以下
 * @param {File} imageFile 原始圖片檔案
 * @returns {Promise<File>} 壓縮後的檔案
 */
export const compressImage = async (imageFile, customOptions = {}) => {
    const options = {
        maxSizeMB: 0.5, // Default
        useWebWorker: true,
        // fileType: 'image/jpeg', // Remove this line to preserve original file type (e.g. PNG)
        ...customOptions // Allow overriding
    };

    try {
        console.log(`originalFile size ${imageFile.size / 1024 / 1024} MB`);
        const compressedFile = await imageCompression(imageFile, options);
        console.log(`compressedFile size ${compressedFile.size / 1024 / 1024} MB`);
        return compressedFile;
    } catch (error) {
        console.error('Compression failed:', error);
        throw error;
    }
};

/**
 * 格式化檔案大小
 * @param {number} bytes 
 * @returns {string} e.g. "1.2 MB"
 */
export const formatSize = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};
