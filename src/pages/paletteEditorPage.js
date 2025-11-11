import { createElement } from '../utils/createElement.js';
import { initColorInput } from '../components/colorInput.js';

export function renderPaletteEditorPage(outerElement, colors = []) {

  const section = createElement('section', outerElement);

  const title = createElement('h2', section);
  title.textContent = 'Palette Editor';

  const editor = createElement('div', section, 'palette-editor');

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
}