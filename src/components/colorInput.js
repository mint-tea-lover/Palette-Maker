export function initColorInput(colorSwatch) {
  const inp = colorSwatch.querySelector('.color-input');
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