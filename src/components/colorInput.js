import { rgbToHex } from "../utils/colorConverter.js";
import { resetColorSliders } from "./paletteEditor.js";
import { createElement } from "../utils/createElement.js";

export function initColorInput(colorSwatch, color) {
  const inp = colorSwatch.querySelector('.color-input');
  if (color) {
    if (!color.startsWith('#')) {
      const rgbArrayStrings = color.match(/\d+/g);
      const rgbArrayNumbers = rgbArrayStrings.map(value => parseInt(value, 10));
      inp.value = rgbToHex(...rgbArrayNumbers);
    } else {
      inp.value = color;
    }
  }


  const actionButtons = colorSwatch.querySelectorAll('.color-swatch-btn');
  colorSwatch.addEventListener('click', (e) => {
    let clickedActionButton = false;
    
    // Проходим по всем найденным кнопкам
    actionButtons.forEach(button => {
      // И используем contains() для проверки
      if (button.contains(e.target)) {
        clickedActionButton = true;
      }
    });

    // 2. Если клик не попал ни в одну из кнопок, открываем color picker
    if (!clickedActionButton) {
      inp.click();
    }
  })

  inp.addEventListener('input', (e) => {
    colorSwatch.style.backgroundColor = e.target.value
    resetColorSliders();
  })
}

// src/utils/colorPicker.js

export function initCustomColorPicker(containerElement, defaultColor, onChangeCallback) {
  // Создаем элемент, к которому привяжется Pickr
  const pickerElement = createElement('div', containerElement, ['color-picker-trigger']);
  const swatch = containerElement.querySelector('.color-swatch');

  // Инициализация Pickr
  const newElement = document.createElement('div');
    containerElement.appendChild(newElement);
  
    const pickr = new Pickr({
      el: newElement,
      default: defaultColor,
      theme: 'nano',
      lockOpacity: true,
      closeOnScroll: false,
  
      components: {
        preview: true,
        opacity: true,
        hue: true,
  
        interaction: {
          hex: true,
          rgba: true,
          hsva: true,
          input: true,
        }
      },
      position: 'left-middle',
    });

  // СОБЫТИЯ

  // При изменении цвета
  pickr.on('change', (color, source, instance) => {
    const hexColor = color.toHEXA().toString();
    
    // Обновляем swatch
    containerElement.style.backgroundColor = hexColor;
    containerElement.dataset.color = hexColor; 
    
    containerElement.dispatchEvent(new Event('input', { bubbles: true }));
    // Вызываем внешний callback (например, для обновления градиента)
    if (onChangeCallback) onChangeCallback(hexColor);
  });
  
  return pickr;
}