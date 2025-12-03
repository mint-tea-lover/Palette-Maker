import { getCurrentColors, renderPaletteEditor, setPaletteColors } from "../components/paletteEditor.js";
import { createElement } from "../utils/createElement.js";
import { rgbToHex } from "../utils/colorConverter.js"

const colorThief = new ColorThief();

export function renderPaletteFromImagePage(outerElement) {
    const container = createElement("div", outerElement, ['img-palette-container']);

    // --- Контейнер изображения и загрузчик ---
    const imgContainer = createElement('div', container, ['img-container']);

    // Создаем элемент <input type="file">
    const fileInput = createElement('input', imgContainer, ['image-uploader']);
    fileInput.type = 'file';
    fileInput.accept = 'image/*'; // Принимать только изображения
    fileInput.style.display = 'none';
    // Кнопка, которая инициирует клик по инпуту
    const uploadBtn = createElement('button', imgContainer, ['btn', 'upload-img-btn']);
    uploadBtn.textContent = 'Upload Image';

    uploadBtn.addEventListener('click', () => {
        fileInput.click();
    });

    // Элемент <img> для отображения загруженного изображения
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
    const editorElement = renderPaletteEditor(paletteContainer, []);

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
                // Это важно для обхода CORS, даже если это локальный файл
                imgElement.crossOrigin = 'Anonymous';
            };

            // Читаем файл как Data URL (Base64-строку)
            reader.readAsDataURL(file);
        }
    });

    generatePaletteBtn.addEventListener('click', () => {
        if (!imgElement.src || imgElement.naturalWidth === 0) {
            alert('Upload an image first!');
            return;
        }

        // ColorThief может работать только после полной загрузки изображения
        if (imgElement.complete) {
            generatePalette(imgElement, editorElement);
        } else {
            // Если изображение еще не успело загрузиться, вешаем слушатель
            imgElement.onload = () => {
                generatePalette(imgElement, editorElement);
                imgElement.onload = null; // Удаляем слушатель после первого запуска
            };
        }
    });
}

/**
 * Получает палитру от ColorThief и передает ее в редактор.
 * @param {HTMLImageElement} imgElement Элемент <img>
 * @param {HTMLElement} editorElement Главный контейнер редактора, возвращенный renderPaletteEditor
 */
function generatePalette(imgElement, editorElement) {
    try {
        // Получаем палитру из 5 цветов (количество можно настроить)
        const rgbPalette = colorThief.getPalette(imgElement, getCurrentColors(editorElement).length, 10);
        
        // Преобразуем массив RGB ([r, g, b]) в массив HEX (#rrggbb)
        const hexPalette = rgbPalette.map(([r, g, b]) => rgbToHex(r, g, b));
        
        // Обновляем отрисованную палитру
        setPaletteColors(editorElement, hexPalette);

    } catch (e) {
        console.error("Ошибка при получении палитры. Убедитесь, что изображение загружено и доступно для Canvas (CORS).", e);
        alert("Failed to load palette. Check console for detales");
    }
}


