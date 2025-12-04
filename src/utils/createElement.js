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
      el.setAttribute(attrName, attr[attrName]);
      
    }
  }
  return el;
}




