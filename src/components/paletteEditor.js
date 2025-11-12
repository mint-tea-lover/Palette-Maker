import { createElement } from "../utils/createElement.js";
import { initColorInput } from "./colorInput.js";


export function renderPaletteEditor(parent, colors) {
  const editor = createElement('div', parent, 'palette-editor');

  const palette = createElement('div', editor, 'palette-colors');
  const properties = createElement('div', editor, 'palette-properties');
  properties.textContent = 'Lorem afkl;dskfllsdfldlfdjnjfngdjndgjnndf dfgdfgnjkdfngj sfdngfdjkg'

  const swatches = [];

  if (colors) {
    for (let c of colors) {
      appendColorSwatch(palette, c);
    }
  }

  else {
    for (let i = 0; i < 6; i++) {
      appendColorSwatch(palette);
    }
  }

  const addBtn = createElement('button', palette, ['color-swatch', 'add-color-btn']);
  addBtn.textContent = '+';
  addBtn.addEventListener('click', () => {
    appendColorSwatch(palette);
  })

  return editor;
}


function appendColorSwatch(parent, color) {
  const swatch = createElement('div', parent, 'color-swatch');
  const colorInput = createElement('input', swatch, ['color-input'], { 'type': 'color' });
  
  const addBtn = parent.querySelector('.add-color-btn');
  parent.insertBefore(swatch, addBtn);

  initColorInput(swatch);

  if (color) {
    swatch.style.backgroundColor = color;
  }
}