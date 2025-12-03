import { rgbToHex } from "../utils/colorConverter.js";

export function initColorInput(colorSwatch, color) {
  const inp = colorSwatch.querySelector('.color-input');
  if (color) {
    const rgbArrayStrings = color.match(/\d+/g);
    const rgbArrayNumbers = rgbArrayStrings.map(value => parseInt(value, 10));
    inp.value = rgbToHex(...rgbArrayNumbers);
  }

  const del = colorSwatch.querySelector('.delete-color-btn');
  colorSwatch.addEventListener('click', (e) => {
    if (!del.contains(e.target)) {
      inp.click();
    }
  })

  inp.addEventListener('input', (e) => {
    colorSwatch.style.backgroundColor = e.target.value
  })
}