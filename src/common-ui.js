import { initDropdowns } from "./components/dropdown.js";

// Инициализируем только общие элементы UI
export function initCommonUI() {
    initDropdowns(document.body);
}

// Запускаем инициализацию сразу после загрузки DOM
document.addEventListener('DOMContentLoaded', initCommonUI);