export function createElement(tag, parent, classes = []) {
  const el = document.createElement(tag);
  if (parent) {
    parent.appendChild(el);
  }

  if (typeof classes === 'string')
    el.classList.add(classes);
  else
    el.classList.add(...classes);
  return el;
}

export function div(parent, classes = []) {
  return createElement('div', parent, classes);
}

export function button(parent, classes = []) {
  return createElement('button', parent, classes);
}

export function section(parent, classes = []) {
  return createElement('section', parent, classes);
}


