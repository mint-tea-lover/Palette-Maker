import {createElement} from '../utils/createElement.js';

export function renderCreatePalette(outerElement, colors = []) {

  const section = createElement('section', outerElement);

  const title = createElement('h2', section);
  title.textContent = 'Palette Editor';

  const editor = createElement('div', section, 'palette-editor');
  
  const palette = createElement('div', editor, 'palette-colors');
  const properties = createElement('div', editor, 'palette-properties');

  if (colors.length > 0) {
    for (let c of colors) {
      const swatch = createElement('button', palette, 'color-swatch');
      swatch.style.backgroundColor = c;
    }
  }

  else {
    for (let i = 0; i < 6; i++) 
      createElement('button', palette, 'color-swatch');
  }

  const addBtn = createElement('button', palette, ['color-swatch', 'add-color-btn']);
      addBtn.textContent = '+';
}