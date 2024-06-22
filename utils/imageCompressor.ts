// imageCompressor.js
import Compressor from 'compressorjs';

/**
 * Compress an image file using compressorjs
 * @param {File} file - The image file to compress
 * @param {number} quality - The quality of the compressed image (0 to 1)
 * @param {number} maxWidth - The maximum width of the compressed image
 * @param {number} maxHeight - The maximum height of the compressed image
 * @returns {Promise<File>} - A promise that resolves to the compressed image file
 */
export function compressImage(file:File, quality = 0.75, maxWidth = 800, maxHeight = 600) {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: quality,
      maxWidth: maxWidth,
      maxHeight: maxHeight,
      success(result) {
        resolve(result);
      },
      error(err) {
        reject(err);
      },
    });
  });
}
