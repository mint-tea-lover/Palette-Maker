export function initColorInput(colorSwatch) {
  const inp = colorSwatch.querySelector('.color-input');
  colorSwatch.addEventListener('click', (e) => {
    console.log('click');
    inp.click();
  })

  inp.addEventListener('input', (e) => {
    console.log(e)
    colorSwatch.style.backgroundColor = e.target.value
  })
}