import { rgbToHex } from "../utils/colorConverter.js";
import { resetColorSliders } from "./paletteEditor.js";

export function initColorInput(colorSwatch, color) {
  const inp = colorSwatch.querySelector('.color-input');
  if (color) {
    if (!color.startsWith('#')) {
      const rgbArrayStrings = color.match(/\d+/g);
      const rgbArrayNumbers = rgbArrayStrings.map(value => parseInt(value, 10));
      inp.value = rgbToHex(...rgbArrayNumbers);
    } else {
      inp.value = color;
    }
  }


  const actionButtons = colorSwatch.querySelectorAll('.color-swatch-btn');
  colorSwatch.addEventListener('click', (e) => {
    let clickedActionButton = false;
    
    // Проходим по всем найденным кнопкам
    actionButtons.forEach(button => {
      // И используем contains() для проверки
      if (button.contains(e.target)) {
        clickedActionButton = true;
      }
    });

    // 2. Если клик не попал ни в одну из кнопок, открываем color picker
    if (!clickedActionButton) {
      inp.click();
    }
  })

  inp.addEventListener('input', (e) => {
    colorSwatch.style.backgroundColor = e.target.value
    resetColorSliders();
  })
}