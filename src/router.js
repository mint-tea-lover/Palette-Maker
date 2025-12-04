import { renderPaletteEditorPage } from './pages/paletteEditorPage.js';
import { renderPaletteFromImagePage } from './pages/paletteFromImagePage.js';
import { renderGalleryPage } from './pages/galleryPage.js';
import { renderGradientEditorPage } from './pages/gradientEditorPage.js';

const routes = {
  '#palette-editor': renderPaletteEditorPage,
  '#palette-from-image': renderPaletteFromImagePage,
  '#gallery': renderGalleryPage,
  '#gradient-editor': renderGradientEditorPage
};

export function router() {
  const rawHash = window.location.hash || '#';
  // Делим на путь и параметры
  const [routePath, queryString] = rawHash.split('?');

  // Парсим параметры
  // Если queryString есть, превращаем его в объект, иначе - пустой объект
  const params = queryString
    ? Object.fromEntries(new URLSearchParams(queryString))
    : {};

  // Находим рендер-функцию
  const render = routes[routePath] || renderPaletteEditorPage;
  const app = document.getElementById('app');

  if (app) {
    app.innerHTML = '';
    render(app, params);
  }

}