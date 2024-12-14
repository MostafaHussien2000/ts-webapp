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

  const el = Object.assign(document.createElement(tag), props || {});

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
