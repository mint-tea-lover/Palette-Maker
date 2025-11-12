export function initColorInput(colorSwatch) {
  const inp = colorSwatch.querySelector('.color-input');
  colorSwatch.addEventListener('click', (e) => {
    inp.click();
  })

  inp.addEventListener('input', (e) => {
    colorSwatch.style.backgroundColor = e.target.value
  })
}