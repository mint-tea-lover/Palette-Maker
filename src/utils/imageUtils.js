/**
 * Сжимает изображение (imgElement) и возвращает его как Base64 JPEG строку.
 * @param {HTMLImageElement} imgElement - Элемент изображения.
 * @param {number} quality - Качество сжатия (0.0 до 1.0).
 * @param {number} [maxWidth=800] - Максимальная ширина для изменения размера.
 * @returns {string} Сжатая Base64 строка.
 */
export function compressImage(imgElement, quality, maxWidth = 800) {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    // Изменение размера
    let width = imgElement.naturalWidth;
    let height = imgElement.naturalHeight;

    if (width > maxWidth) {
        height = Math.round(height * (maxWidth / width));
        width = maxWidth;
    }

    canvas.width = width;
    canvas.height = height;

    // Отрисовка с новыми размерами
    ctx.drawImage(imgElement, 0, 0, width, height);

    // Сжатие и сохранение
    // Используем 'image/jpeg' с указанным качеством (например, 0.7)
    const compressedDataURL = canvas.toDataURL('image/jpeg', quality); 
    
    return compressedDataURL;
}