import { getSavedItems, deleteItem, PaletteTypes } from "../utils/storage.js"
import { createElement } from "../utils/createElement.js";


export function renderGalleryPage(outerElement) {
  // Очистка родителя
  outerElement.innerHTML = '';

  // Основная страница
  const section = createElement('section', outerElement, ['gallery-section']);

  const title = createElement('h2', section);
  title.textContent = 'Saved Gallery';

  const items = getSavedItems();

  if (items.length === 0) {
    createElement('p', section).textContent = 'You have no saved palettes. Create something!';
    return;
  }

  const grid = createElement('div', section, ['gallery-grid']);
  grid.id = 'gallery-grid';

  // Добавление карточек в сетку
  items.forEach(item => {
    const card = createGalleryCard(item);
    grid.appendChild(card);
  });
}



function createGalleryCard(item) {
  // Основная карточка
  const card = createElement('div', null, ['gallery-card']);
  card.dataset.id = item.id;

  // Контейнер превью
  let previewContainer = createElement('a', card, ['preview-container']);
  if (item.type == PaletteTypes.PALETTE) {
    previewContainer.href = `#palette-editor?palette_id=${item.id}`;
  }
  else if (item.type == PaletteTypes.IMAGE) {
    previewContainer.href = `#palette-from-image?palette_id=${item.id}`;
  }
  else if (item.type == PaletteTypes.GRADIENT) {
    previewContainer.href = `#gradient-editor?palette_id=${item.id}`;
  }


  // Генерация превью
  if (item.type === PaletteTypes.PALETTE || item.type === PaletteTypes.IMAGE) {

    const preview = createElement('div', previewContainer, ['palette-preview']);

    // Для image-palette 
    if (item.imageBase64) {
      const img = createElement('img', preview, ['palette-image-thumb']);
      img.src = item.imageBase64;
    }

    // Для палитр (полоски цвета)
    const colorsFlex = createElement('div', preview, ['preview-colors']);

    item.colors.forEach(c => {
      const colorBlock = createElement('div', colorsFlex, ['color-block']);
      colorBlock.style.backgroundColor = c;
    });

  } else if (item.type === PaletteTypes.GRADIENT) {
    // Для градиентов: блок с градиентным фоном
    //
    //
    ///////
  }

  // Информация
  const info = createElement('div', card, ['card-info']);

  const title = createElement('h3', info);
  title.textContent = item.name;

  const dateSpan = createElement('span', info, ['date']);
  dateSpan.textContent = item.date;

  const deleteBtn = createElement('button', info, ['delete-btn-gallery']);
  deleteBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 -960 960 960" width="1em" fill="currentColor"><path d="M280-120q-33 0-56.5-23.5T200-200v-520q-17 0-28.5-11.5T160-760q0-17 11.5-28.5T200-800h160q0-17 11.5-28.5T400-840h160q17 0 28.5 11.5T600-800h160q17 0 28.5 11.5T800-760q0 17-11.5 28.5T760-720v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM400-280q17 0 28.5-11.5T440-320v-280q0-17-11.5-28.5T400-640q-17 0-28.5 11.5T360-600v280q0 17 11.5 28.5T400-280Zm160 0q17 0 28.5-11.5T600-320v-280q0-17-11.5-28.5T560-640q-17 0-28.5 11.5T520-600v280q0 17 11.5 28.5T560-280ZM280-720v520-520Z"/></svg>`;

  // Удаление (обработчик события)
  deleteBtn.addEventListener('click', () => {
    if (confirm(`Delete palette "${item.name}"?`)) {
      deleteItem(item.id);
      card.remove(); // Удаляем только карточку, не перерисовывая всю страницу
    }
  });

  return card;
}