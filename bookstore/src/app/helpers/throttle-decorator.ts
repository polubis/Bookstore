export function throttleEvent(delay: number = 200): MethodDecorator {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    let timeout = null;

    const original = descriptor.value;

    descriptor.value = function (...args) {
      timeout = setTimeout(() => original.apply(this, args), delay);
    };

    return descriptor;
  };
}
