import { createElement } from '../utils/createElement.js';
import { renderPaletteEditor, getCurrentColors } from '../components/paletteEditor.js';
import { saveItem, PaletteTypes } from '../utils/storage.js';


export function renderPaletteEditorPage(outerElement, colors = []) {

  const section = createElement('section', outerElement, ['editor-container']);

  const title = createElement('h2', section);
  title.textContent = 'Palette Editor';

  const editor = renderPaletteEditor(section, colors);

   const saveBtn = createElement('button', section, ['save-btn', 'btn']);
    saveBtn.textContent = 'Save Palette';
  
    saveBtn.addEventListener('click', () => {
      const name = prompt('Name your palette', 'New palette');
  
      if (name) {
        const colors = getCurrentColors(editor); // Собираем цвета
  
        const itemToSave = {
          name: name,
          colors: colors,
          type: PaletteTypes.PALETTE, 
        };
  
        if (saveItem(itemToSave)) {
          alert('Saved!');
        }
      }
    });

}