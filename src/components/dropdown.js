function initDropdownMenu(dropdownEl) {
  const button = dropdownEl.querySelector('.dropdown-toggle');
  const menu = dropdownEl.querySelector('.dropdown-menu');

  button.addEventListener('click', (e) => {
    menu.classList.toggle('visible');
    e.stopPropagation()
  });

  // Закрываем при клике
  document.addEventListener('click', (e) => {
    menu.classList.remove('visible');
  });
}

export function initDropdowns(container) {
  const dropdowns = container.querySelectorAll('.dropdown-container');
  for (let dropdown of dropdowns) {
    initDropdownMenu(dropdown);
  }
}
