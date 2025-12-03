import { renderPaletteEditor } from "../components/paletteEditor.js";
import { createElement } from "../utils/createElement.js";

// Предполагаем, что renderPaletteEditor импортирован

export function renderPaletteFromImagePage(outerElement) {
    const container = createElement("div", outerElement, ['img-palette-container']);
    
    // --- 1. Контейнер изображения и загрузчик ---
    const imgContainer = createElement('div', container, ['img-container']);
    
    // Создаем элемент <input type="file">
    const fileInput = createElement('input', imgContainer, ['image-uploader']);
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // Принимать только изображения
    fileInput.style.display = 'none';
    // Опционально: можно добавить кнопку, которая будет инициировать клик по инпуту
    const uploadBtn = createElement('button', imgContainer, ['btn', 'upload-img-btn']);
    uploadBtn.textContent = 'Upload Image';
    
    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });
    
    // Создаем элемент <img> для отображения загруженного изображения
    const imgElement = createElement('img', imgContainer, ['loaded-image']);
    imgElement.src = ''; 
    imgElement.alt = 'Uploaded image';
    
    // Скрываем начальное тестовое изображение, которое вы вставляли,
    // теперь отображаем только загруженный файл.
    // Если нужно стартовое изображение, можно поставить ему src='...'
    
    // --- Контейнер редактора ---
    const editorContainer = createElement('div', container, ['img-editor-container']);
    
    const generatePaletteBtn = createElement('button', editorContainer, ['btn', 'generate-btn']);
    generatePaletteBtn.textContent = 'Generate Palette';
    
    const paletteContainer = createElement('div', editorContainer, ['palette-container']);
    const editor = renderPaletteEditor(paletteContainer, []);

    // --- Логика загрузки файла ---
    fileInput.addEventListener('change', (event) => {
        const file = event.target.files[0];

        if (file) {
            // Создаем объект FileReader для чтения файла
            const reader = new FileReader();

            // Что делать, когда файл будет полностью прочитан
            reader.onload = (e) => {
                // Устанавливаем base64-строку файла как источник изображения
                imgElement.src = e.target.result; 
            };

            // Читаем файл как Data URL (Base64-строку)
            reader.readAsDataURL(file);
        }
    });

    
}