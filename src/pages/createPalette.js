export function renderCreatePalette(outerElement, colors = []) {

  const section = document.createElement('section');
  outerElement.appendChild(section);

  const title = document.createElement('h2');
  section.appendChild(title);
  title.textContent = 'Palette Editor';

  const editor = document.createElement('div');
  section.appendChild(editor);
  editor.classList.add('palette-editor');


  const palette = document.createElement('div');
  palette.classList.add('palette-colors');
  editor.appendChild(palette);
  
  const properties = document.createElement('div');
  properties.classList.add('palette-properties');
  editor.appendChild(properties);

  if (colors.length > 0) {
    for (let c in colors) {
      const swatch = document.createElement('button');
      swatch.classList.add('color-swatch');
      swatch.style.backgroundColor = c;
      palette.appendChild(swatch);
    }
  }

  else {
    for (let i = 0; i < 6; i++) {
      const swatch = document.createElement('button');
      swatch.classList.add('color-swatch');
      palette.appendChild(swatch);
    }
  }

  const addBtn = document.createElement('button');
      addBtn.classList.add('color-swatch', 'add-color-btn');
      addBtn.textContent = '+';
      palette.appendChild(addBtn);

}