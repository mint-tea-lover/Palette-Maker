export function initDeleteButton(deletedElem, button, deleteFunc = () => {}) {
  button.addEventListener('click', () => {
    deletedElem.remove();
    button.remove();
    deleteFunc();
  })
}