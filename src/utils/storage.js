const STORAGE_KEY = 'design_app_gallery';

// Типы сохраненнных элементов
export const PaletteTypes = {
  PALETTE: 'palette',
  GRADIENT: 'gradient',
  IMAGE: 'image-palette',
};

// Получить все сохранения
export function getSavedItems() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

// Создать новое сохранение
export function saveItem(item) {
  const items = getSavedItems();
  
  // Добавляем id и дату автоматически
  const newItem = {
    ...item,
    id: Date.now(),
    date: new Date().toLocaleDateString()
  };

  items.unshift(newItem); // добавляем в начало
  
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return true;
  } catch (e) {
    alert('Ошибка сохранения! Возможно слишком большой размер файла.');
    return false;
  }
}

// Удалить
export function deleteItem(id) {
  const items = getSavedItems().filter(i => i.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}