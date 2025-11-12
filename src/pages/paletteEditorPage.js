import { createElement } from '../utils/createElement.js';
import { renderPaletteEditor } from '../components/paletteEditor.js';

export function renderPaletteEditorPage(outerElement, colors = []) {

  const section = createElement('section', outerElement);

  const title = createElement('h2', section);
  title.textContent = 'Palette Editor';

  const editor = renderPaletteEditor(section, colors);

}