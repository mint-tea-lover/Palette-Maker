function initDropdownMenu(dropdownEl) {
  const button = dropdownEl.querySelector('.dropdown-toggle');
  const menu = dropdownEl.querySelector('.dropdown-menu');

  button.addEventListener('click', () => {
    menu.classList.toggle('visible');
  });

  // Закрываем при клике вне меню
  document.addEventListener('click', (e) => {
    if (!dropdownEl.contains(e.target)) {
      menu.classList.remove('visible');
    }
  });
}

export function initDropdowns(container) {
  const dropdowns = container.querySelectorAll('.dropdown-container');
  for (let dropdown of dropdowns) {
    initDropdownMenu(dropdown);
  }
}
