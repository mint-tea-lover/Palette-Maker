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
  previewContainer.href = `#palette-editor?palette_id=${item.id}`;

  // Генерация превью
  if (item.type === PaletteTypes.PALETTE || item.type === PaletteTypes.IMAGE) {
    // Для палитр (полоски цвета)
    const colorsFlex = createElement('div', previewContainer, ['palette-preview']);

    item.colors.forEach(c => {
      const colorBlock = createElement('div', colorsFlex, ['color-block']);
      colorBlock.style.backgroundColor = c;
    });

    // Для image-palette 
    if (item.imageBase64) {
      const img = createElement('img', previewContainer, ['palette-image-thumb']);
      img.src = item.imageBase64;
    }

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
  deleteBtn.innerHTML = 'del';

  // Удаление (обработчик события)
  deleteBtn.addEventListener('click', () => {
    if (confirm(`Удалить палитру "${item.name}"?`)) {
      deleteItem(item.id);
      card.remove(); // Удаляем только карточку, не перерисовывая всю страницу
    }
  });

  return card;
}