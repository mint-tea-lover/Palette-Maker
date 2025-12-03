export function initColorInput(colorSwatch, color) {
  const inp = colorSwatch.querySelector('.color-input');
  inp.value = color;
  const del = colorSwatch.querySelector('.delete-color-btn');
  colorSwatch.addEventListener('click', (e) => {
    if (!del.contains(e.target)){
      inp.click();
    } 
  })

  inp.addEventListener('input', (e) => {
    colorSwatch.style.backgroundColor = e.target.value
  })
}