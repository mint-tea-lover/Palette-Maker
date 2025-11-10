import { renderCreatePalette } from './pages/createPalette.js';
import { renderFromImage } from './pages/fromImage.js';
import { renderGallery } from './pages/gallery.js';
import { renderLearn } from './pages/learn.js';
import { renderGradient } from './pages/gradient.js';

const routes = {
  '#create': renderCreatePalette,
  '#from-image': renderFromImage,
  '#gallery': renderGallery,
  '#learn': renderLearn,
  '#gradient': renderGradient
};

export function router() {
  const hash = window.location.hash || '#create';
  const render = routes[hash] || renderCreatePalette;
  const app = document.getElementById('app');
  app.innerHTML = '';
  render(app, ['#fff', '#1200bb', '#4bf55cff', '#4bf55cff','#4bf55cff']);
}