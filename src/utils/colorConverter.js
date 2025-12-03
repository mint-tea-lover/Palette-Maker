export function rgbToHex(r, g, b) {
    const componentToHex = (c) => {
        const hex = c.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
    };
    // Убедимся, что все значения - целые числа и находятся в диапазоне 0-255
    r = Math.round(Math.max(0, Math.min(255, r)));
    g = Math.round(Math.max(0, Math.min(255, g)));
    b = Math.round(Math.max(0, Math.min(255, b)));
    
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}