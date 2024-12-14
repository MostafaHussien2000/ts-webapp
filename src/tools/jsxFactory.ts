export function createElement(
  tag: any,
  props: Object,
  ...children: Object[]
): HTMLElement {
  function addChild(el: HTMLElement, child: any) {
    el.appendChild(
      child instanceof Node ? child : document.createTextNode(child.toString())
    );
  }

  if (typeof tag === "function")
    return Object.assign(new tag(), { props: props || {} }).getContent();

  const el = document.createElement(tag);
  
  if (props) {
    Object.entries(props).forEach(([name, value]) => {
      if (name.startsWith('on') && typeof value === 'function') {
        // Handle event listeners
        el.addEventListener(name.toLowerCase().substring(2), value);
      } else {
        // Handle regular attributes
        if (name === 'className') {
          el.setAttribute('class', value as string);
        } else {
          el.setAttribute(name, value as string);
        }
      }
    });
  }

  children.forEach((child) =>
    Array.isArray(child)
      ? child.forEach((c) => addChild(el, c))
      : addChild(el, child)
  );

  return el;
}

declare global {
  namespace JSX {
    interface ElementAttributesProperty {
      props: any;
    }
    interface IntrinsicElements {
      [elemName: string]: any;
    }
  }
}
