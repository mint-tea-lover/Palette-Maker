import { createElement } from '../utils/createElement.js';
import { renderPaletteEditor, getCurrentColors } from '../components/paletteEditor.js';
import { generateGradientString } from '../utils/gradient.js';

export function renderGradientEditorPage(outerElement) {
  outerElement.innerHTML = '';
  const section = createElement('section', outerElement, ['gradient-section']);
  createElement('h2', section).textContent = 'Gradient Creator';

  // 1. ПРЕВЬЮ ГРАДИЕНТА
  const previewBox = createElement('div', section, ['gradient-preview-box']);
  // Добавим кнопку "Copy CSS" внутрь или рядом
  const cssOutput = createElement('div', section, ['css-output']);
  cssOutput.textContent = 'background: ...';


  // 2. КОНТРОЛЛЫ (Угол и Тип)
  const controls = createElement('div', section, ['gradient-controls']);
  
  // -- Ползунок угла --
  const angleLabel = createElement('label', controls);
  angleLabel.textContent = 'Angle: 90deg';
  
  const angleInput = createElement('input', controls, ['angle-slider'], {
    type: 'range',
    min: '0',
    max: '360',
    value: '90'
  });

  // -- Переключатель типа (Linear/Radial) --
  const typeSelect = createElement('select', controls, ['type-select']);
  ['linear', 'radial'].forEach(type => {
    const opt = createElement('option', typeSelect);
    opt.value = type;
    opt.textContent = type.charAt(0).toUpperCase() + type.slice(1);
  });


  // 3. СПИСОК ЦВЕТОВ (Используем твой готовый редактор!)
  const paletteContainer = createElement('div', section, ['palette-container-wrapper']);
  // Рендерим редактор с парой начальных цветов
  const editor = renderPaletteEditor(paletteContainer, ['#4facfe', '#00f2fe']);


  // === ЛОГИКА ОБНОВЛЕНИЯ ===

  const updatePreview = () => {
    const colors = getCurrentColors(editor);
    const angle = angleInput.value;
    const type = typeSelect.value;

    // Обновляем текст лейбла
    angleLabel.textContent = `Angle: ${angle}deg`;
    
    // Скрываем ползунок угла, если выбран радиальный градиент
    if (type === 'radial') {
       angleInput.disabled = true;
       angleInput.style.opacity = '0.5';
    } else {
       angleInput.disabled = false;
       angleInput.style.opacity = '1';
    }

    // Генерируем CSS
    const gradientCss = generateGradientString(colors, angle, type);
    
    // Применяем к превью
    previewBox.style.background = gradientCss;
    
    // Выводим код для копирования
    cssOutput.textContent = `background: ${gradientCss};`;
  };

  // === СЛУШАТЕЛИ СОБЫТИЙ ===

  // Слушаем изменения в контролах
  angleInput.addEventListener('input', updatePreview);
  typeSelect.addEventListener('change', updatePreview);

  // Слушаем изменения в редакторе цветов.
  // Так как renderPaletteEditor не возвращает callback изменений, 
  // используем делегирование событий на контейнере редактора.
  // Любой клик (удаление/добавление) или ввод (смена цвета) обновит градиент.
  paletteContainer.addEventListener('input', updatePreview);
  paletteContainer.addEventListener('click', updatePreview);

  // Инициализация
  updatePreview();
}