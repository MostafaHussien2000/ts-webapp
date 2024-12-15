import "reflect-metadata";

// Method Decorator
export const minValue =
  (propName: string, min: number) =>
  (
    constructor: Object,
    methodName: string,
    descriptor: PropertyDescriptor
  ): any => {
    const origFunction: Function = descriptor.value;
    descriptor.value = async function wrapper(...args) {
      let results = await origFunction.apply(this, args);
      console.log(results);
      return results.map((r) => ({
        ...r,
        [propName]: r[propName] < min ? min : r[propName],
      }));
    };
  };

export const addProductSlug = (
  constructor: Object,
  methodName: string,
  descriptor: PropertyDescriptor
) => {
  let originalFunction = descriptor.value;
  descriptor.value = async function (...args) {
    let results = await originalFunction.apply(this, args);
    return results.map((r) => ({
      ...r,
      slug: (r.name as string).toLocaleLowerCase().split(" ").join("-"),
    }));
  };
};

export const addClass =
  (selector: string, ...classNames: string[]) =>
  (constructor: Object, methodName: string, descriptor: PropertyDescriptor) => {
    if (Reflect.getMetadata("design:returnType", constructor, methodName)) {
      const origFunction: Function = descriptor.value;
      descriptor.value = function wrapper(...args) {
        let content: HTMLElement = origFunction.apply(this, args);
        content.querySelectorAll(selector).forEach((element) => {
          classNames.forEach((className) => element.classList.add(className));
        });
        return content;
      };
    }
  };
