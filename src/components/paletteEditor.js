import { createElement } from "../utils/createElement.js";
import { initColorInput } from "./colorInput.js";


export function renderPaletteEditor(parent, colors) {
  const editor = createElement('div', parent, 'palette-editor');
  
    const palette = createElement('div', editor, 'palette-colors');
    const properties = createElement('div', editor, 'palette-properties');
  
    const swatches = [];
  
    if (colors) {
      for (let c of colors) {
        const div = createElement('div', palette, 'color-swatch');
        div.style.backgroundColor = c;
        const colorInput = createElement('input', div, ['color-input'], { 'type': 'color' });
        swatches.push(div);
      }
    }
  
    else {
      for (let i = 0; i < 6; i++) {
        const div = createElement('div', palette, 'color-swatch');
        const colorInput = createElement('input', div, ['color-input'], { 'type': 'color' });
        swatches.push(div);
      }
    }
  
    swatches.forEach((swatch) => {
      initColorInput(swatch);
    })
  
    const addBtn = createElement('button', palette, ['color-swatch', 'add-color-btn']);
    addBtn.textContent = '+';

    return editor;
}