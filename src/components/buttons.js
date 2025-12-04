export function initDeleteButton(deletedElem, button, deleteFunc = () => {}) {
  button.addEventListener('click', () => {
    deletedElem.remove();
    button.remove();
    deleteFunc();
  })
}

export function initCopyButton(swatch, button) {
  button.addEventListener('click', async (e) => {
    // Обязательно останавливаем всплытие, чтобы не сработал обработчик клика на 
    // родительском элементе .palette-item (который открывает color picker).
    e.stopPropagation();

    const colorInput = swatch.querySelector('.color-input');
    // <input type="color"> всегда возвращает HEX-строку (например, #RRGGBB)
    const hexCode = colorInput.value.toUpperCase(); 

    try {
      // Копируем HEX-код в буфер обмена
      await navigator.clipboard.writeText(hexCode);

      // Временно меняем иконку на галочку
      const originalIcon = button.innerHTML;
      button.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 -960 960 960" width="1em" fill="currentColor"><path d="m382-354 339-339q12-12 28-12t28 12q12 12 12 28.5T777-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"/></svg>`;
      
      setTimeout(() => {
        button.innerHTML = originalIcon;
      }, 1000);

    } catch (err) {
      console.error('Ошибка при копировании:', err);
      // Fallback на случай, если Clipboard API недоступен
      alert(`Не удалось скопировать. Код: ${hexCode}`);
    }
  });
}