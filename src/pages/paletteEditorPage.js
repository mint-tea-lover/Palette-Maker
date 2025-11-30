import { createElement } from '../utils/createElement.js';
import { renderPaletteEditor, getCurrentColors } from '../components/paletteEditor.js';
import { saveItem, updateItem, PaletteTypes, getItemById } from '../utils/storage.js';


export function renderPaletteEditorPage(outerElement, params = {}) {

  const currentPaletteId = params.palette_id;
  let initialColors = [];
  let currentPalette = null;
  let isEditing = !!currentPaletteId; // Флаг, который показывает, что мы в режиме редактирования

  if (isEditing) {
    currentPalette = getItemById(currentPaletteId);
    if (currentPalette) {
      initialColors = currentPalette.colors;
    } else {
      // Если ID был в URL, но палитра не найдена (удалена), переходим в режим создания
      isEditing = false;
    }
  }

  const section = createElement('section', outerElement, ['editor-container']);
  const title = createElement('h2', section);
  title.textContent = `Palette Editor - ${isEditing ? currentPalette?.name : 'New palette'}`;

  const editor = renderPaletteEditor(section, initialColors);

  const actionsGroup = createElement('div', section, ['palette-actions'])


  const saveBtn = createElement('button', actionsGroup, ['save-btn', 'btn']);
  saveBtn.textContent = 'Save Palette';

  if (isEditing) {
    saveBtn.textContent = 'Save as new palette'

    const changeBtn = createElement('button', actionsGroup, ['save-btn', 'btn', 'save-changes-btn']);
    changeBtn.textContent = "Save Changes"
    changeBtn.addEventListener('click', () => {
      currentPalette.colors = getCurrentColors(editor);
      updateItem(currentPalette);
      alert('Changes saved!');
    })
  }

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