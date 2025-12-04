/**
 * Генерирует CSS строку градиента
 */
export function generateGradientString(colors, angle = 90, type = 'linear') {
  if (colors.length === 0) return 'none';
  if (colors.length === 1) return colors[0]; // Если 1 цвет, это просто заливка

  // Браузер сам равномерно распределит цвета, если не указывать проценты!
  const colorString = colors.join(', ');

  if (type === 'radial') {
    return `radial-gradient(circle, ${colorString})`;
  } else {
    return `linear-gradient(${angle}deg, ${colorString})`;
  }
}