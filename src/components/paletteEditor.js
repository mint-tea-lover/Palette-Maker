import { button, createElement } from "../utils/createElement.js";
import { initColorInput } from "./colorInput.js";
import { initDeleteButton } from "./deleteButton.js";
import { PaletteSliders } from "./sliders.js"


let colorSliders = null;

export function renderPaletteEditor(parent, colors) {
  const editor = createElement('div', parent, 'palette-editor');

  const palette = createElement('div', editor, 'palette-colors');
  const properties = createElement('div', editor, 'palette-properties');

  const slidersContainer = createElement('div', properties, ['sliders-container']);

  // Создаем экземпляр слайдеров и сохраняем его в переменной модуля
  colorSliders = new PaletteSliders(
    slidersContainer,
    palette,
    // Колбэк должен использовать локальную ссылку на editorElement
    (newHexColors) => { setPaletteColors(editor, newHexColors) }
  );

  const swatches = [];

  if (colors.length > 0) {
    for (let c of colors) {
      appendColorSwatch(palette, c);
    }
  }

  else {
    for (let i = 0; i < 3; i++) {
      appendColorSwatch(palette);
    }
  }

  resetColorSliders();
  const addBtn = createAddColorBtn(palette);

  return editor;
}


function appendColorSwatch(parent, color) {
  const swatch = createElement('div', parent, ['color-swatch', 'palette-item']);
  const colorInput = createElement('input', swatch, ['color-input'], { 'type': 'color' });
  const deleteButton = createElement('button', swatch, ['delete-color-btn', 'delete-btn']);
  deleteButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 -960 960 960" width="1em" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z"/></svg>`;

  const addBtn = parent.querySelector('.add-color-btn');
  parent.insertBefore(swatch, addBtn);

  if (!color) color = 'rgb(160, 160, 169)';


  initColorInput(swatch, color);
  initDeleteButton(swatch, deleteButton, resetColorSliders);

  swatch.style.backgroundColor = color;

  return swatch;
}

function createAddColorBtn(palette) {
  const btn = createElement('button', palette, ['palette-item', 'add-color-btn']);
  btn.textContent = '+';
  btn.addEventListener('click', () => {
    appendColorSwatch(palette);
    resetColorSliders();
  })
  return btn;
}

// Собирает цвета палитры
export function getCurrentColors(parent) {
  const swatches = parent.querySelectorAll('.color-swatch');
  return Array.from(swatches).map(swatch => getComputedStyle(swatch).backgroundColor);
}


/**
 * Очищает контейнер редактора и перерисовывает палитру с новыми цветами.
 * @param {HTMLElement} editorElement Главный контейнер редактора, который возвращает renderPaletteEditor
 * @param {Array<string>} hexColors Массив HEX-строк цветов (например, ['#FF0000', '#00FF00'])
 */
export function setPaletteColors(editorElement, hexColors) {
  const palette = editorElement.querySelector('.palette-colors'); // контейнер, который нужно обновить

  // Очищаем все старые цвета и кнопку '+'
  while (palette.firstChild) {
    palette.removeChild(palette.firstChild);
  }

  console.log(hexColors)
  // Добавляем новые цвета
  hexColors.forEach(hex => {
    // Передаем цвета в формате HEX
    appendColorSwatch(palette, hex);
  });

  // Добавляем кнопку '+' обратно
  const addBtn = createAddColorBtn(palette);
}

export function resetColorSliders() {
  colorSliders.resetAndInitialize();
}
