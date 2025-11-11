export function createElement(tag, parent, classes = [], attr={}) {
  const el = document.createElement(tag);
  if (parent) {
    parent.appendChild(el);
  }

  if (typeof classes === 'string') {
    el.classList.add(classes);
  }
    
  else {
    if (classes) {
      el.classList.add(...classes);
    }
  }
    

  if (attr) {
    for (let attrName in attr) {
      console.log(attrName, attr[attrName])
      el.setAttribute(attrName, attr[attrName]);
      
    }
  }
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


