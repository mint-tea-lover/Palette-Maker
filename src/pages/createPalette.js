export function renderCreatePalette(outerElement){
  outerElement.innerHTML = `<section>
        <h2>Palette Editor</h2>
        <div class="palette-editor">
          <div class="palette-colors">
            <button class="color-swatch"></button>
            <button class="color-swatch"></button>
            <button class="color-swatch"></button>
            <button class="color-swatch"></button>
            <button class="color-swatch"></button>
            <button class="color-swatch"></button>
            <button class="color-swatch"></button>
            <button class="color-swatch"></button>
            <button class="color-swatch"></button>
            <button class="color-swatch add-color-btn">+</button>
          </div>
          <div class="palette-properties">

          </div>
        </div>
      </section>`;

    
}