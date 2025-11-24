import { renderPaletteEditorPage } from './pages/paletteEditorPage.js';
import { renderPaletteFromImagePage } from './pages/paletteFromImagePage.js';
import { renderGalleryPage } from './pages/galleryPage.js';
import { renderLearnPage } from './pages/learnPage.js';
import { renderGradientEditorPage } from './pages/gradientEditorPage.js';

const routes = {
  '#palette-editor': renderPaletteEditorPage,
  '#palette-from-image': renderPaletteFromImagePage,
  '#gallery': renderGalleryPage,
  '#learn': renderLearnPage,
  '#gradient-editor': renderGradientEditorPage
};

export function router() {
  const hash = window.location.hash || '#';
  const render = routes[hash] || renderPaletteEditorPage;
  const app = document.getElementById('app');
  const params = new URL(window.location).searchParams;
  app.innerHTML = '';
  render(app, Object.fromEntries(params.entries()));
}