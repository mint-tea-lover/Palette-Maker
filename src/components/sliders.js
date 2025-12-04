import { hexToRgb, rgbToHex, rgbToHsl, hslToRgb } from '../utils/colorConverter.js';
import { createElement } from '../utils/createElement.js';


// Я использовал упрощенные заглушки для примера, 
// в рабочей версии они должны быть полными, как в предыдущем ответе.
// ---

export class PaletteSliders {
    /**
     * @param {HTMLElement} containerElement - DOM-элемент для размещения ползунков.
     * @param {HTMLElement} paletteColorsElement - Контейнер палитры (для извлечения цветов).
     * @param {function(string[])} updateColorsCallback - Функция для обновления цветов в главном приложении (setPaletteColors).
     */
    constructor(containerElement, paletteColorsElement, updateColorsCallback) {
        this.container = containerElement;
        this.paletteContainer = paletteColorsElement;
        this.updateColors = updateColorsCallback;

        this.originalHslPalette = [];
        this.correction = { h: 0, s: 0, l: 0 };

        this.renderSliders();
        this.attachEventListeners();

        // Инициализация при создании, используя текущие цвета в DOM
        this.resetAndInitialize();
    }

    /**
     * Считывает текущие цвета палитры из DOM, устанавливает их как базовые HSL
     * и сбрасывает значения ползунков.
     */
    resetAndInitialize() {
        // Извлечение текущих HEX-цветов из DOM
        const currentHexArray = this._getHexColorsFromPalette();

        // Конвертация в HSL и сохранение в качестве базовой палитры
        this.originalHslPalette = currentHexArray.map(hex => {
            const [r, g, b] = hexToRgb(hex);
            const [h, s, l] = rgbToHsl(r, g, b);
            return { h, s, l };
        });

        // Сброс коррекции и визуального положения ползунков
        this.resetCorrection();
    }


    /**
     * Сбрасывает значения коррекции и ползунки на 0.
     */
    resetCorrection() {
        this.correction = { h: 0, s: 0, l: 0 };
        this.container.querySelector('#slider-h').value = 0;
        this.container.querySelector('#slider-s').value = 0;
        this.container.querySelector('#slider-l').value = 0;
    }

    // --- Методы для работы с DOM и событиями (без изменений) ---

    renderSliders() {
        const attr = { type: 'range', value: '0', step: '1' }
        createElement('label', this.container, ['color-slider-label'], { for: 'slider-h' }).textContent = 'Hue:';
        createElement('input', this.container, ['color-slider'], { id: 'slider-h', min: '-180', max: '180', ...attr });
        createElement('label', this.container, ['color-slider-label'], { for: 'slider-s' }).textContent = 'Saturation:';
        createElement('input', this.container, ['color-slider'], { id: 'slider-s', min: '-100', max: '100', ...attr });
        createElement('label', this.container, ['color-slider-label'], { for: 'slider-l' }).textContent = 'Lightness:';
        createElement('input', this.container, ['color-slider'], { id: 'slider-l', min: '-100', max: '100', ...attr });
    }

    attachEventListeners() {
        this.container.querySelectorAll('input[type="range"]').forEach(slider => {
            slider.addEventListener('input', this.handleSliderChange.bind(this));
        });
    }

    handleSliderChange(event) {
        const sliderId = event.target.id;
        const value = parseFloat(event.target.value);
        let component;

        if (sliderId.includes('slider-h')) component = 'h';
        else if (sliderId.includes('slider-s')) component = 's';
        else if (sliderId.includes('slider-l')) component = 'l';

        this.correction[component] = value;
        console.log(this.correction)
        this.applyCorrection();
    }

    /**
     * Извлекает текущие HEX цвета из DOM палитры.
     */
    _getHexColorsFromPalette() {
        const swatches = this.paletteContainer.querySelectorAll('.color-swatch');
        return Array.from(swatches).map(swatch => {
            const colorInput = swatch.querySelector('.color-input');
            // Считываем значение из input[type="color"], оно всегда в HEX
            return colorInput ? colorInput.value : '#FFFFFF';
        });
    }

    /**
     * Применяет текущую коррекцию ко всей палитре и вызывает колбэк.
     */
    applyCorrection() {
        if (this.originalHslPalette.length === 0) return;
        console.log(this.originalHslPalette, this.correction)
        const newHexPalette = this.originalHslPalette.map(hsl => {
            let h = hsl.h + this.correction.h;
            let s = hsl.s + this.correction.s;
            let l = hsl.l + this.correction.l;

            h = (h % 360 + 360) % 360;
            s = Math.max(0, Math.min(100, s));
            l = Math.max(0, Math.min(100, l));

            const [r, g, b] = hslToRgb(h, s, l);
            return rgbToHex(r, g, b);
        });

        // Вызываем внешний обработчик, передавая массив новых HEX цветов
        this.updateColors(newHexPalette);
    }
}