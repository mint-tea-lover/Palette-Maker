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
    alert('Ошибка сохранения! Возможно слишком большой размер файла.\n', e);
    return false;
  }
}

// Удалить
export function deleteItem(id) {
  const items = getSavedItems().filter(i => i.id != id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

// Получить элемент по ID
export function getItemById(id) {
  const item = getSavedItems().find(i => i.id == id);
  return item;
}

// Обновить элемент
export function updateItem(updatedItem) {
  const items = getSavedItems();

  // 1. Находим индекс элемента, который нужно обновить
  const index = items.findIndex(item => item.id === updatedItem.id);

  if (index !== -1) {
    // 2. Создаем новый объект, сохраняя старую дату создания, но добавляя новую дату обновления
    items[index] = {
      ...updatedItem,
      date: items[index].date, // Сохраняем оригинальную дату создания
      lastUpdated: new Date().toLocaleDateString(), // Опционально: дата последнего обновления
    };

    // 3. Сохраняем обновленный массив обратно
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
      return true;
    } catch (e) {
      console.error('Ошибка сохранения при обновлении:', e);
      return false;
    }
  }
  return false; // Элемент не найден
}