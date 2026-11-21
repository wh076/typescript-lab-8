export function applyPipeline<A, B>(value: A, first: (value: A) => B): B;
export function applyPipeline<A, B, C>(
  value: A, first: (value: A) => B, second: (value: B) => C
): C;
export function applyPipeline<A, B, C, D>(
  value: A, first: (value: A) => B, second: (value: B) => C, third: (value: C) => D
): D;
export function applyPipeline<A, B, C, D>(
  value: A, first: (value: A) => B, second?: (value: B) => C, third?: (value: C) => D
): B | C | D {
  const firstResult = first(value);
  if (!second) {
    return firstResult;
  }

  const secondResult = second(firstResult);
  if (!third) {
    return secondResult;
  }

  return third(secondResult);
}

const double = (value: number) => value * 2;
const toText = (value: number) => `Число: ${value}`;
const upperCase = (value: string) => value.toUpperCase();

console.log('Один шаг:', applyPipeline(5, double));
console.log('Два шага:', applyPipeline(5, double, toText));
console.log('Три шага:', applyPipeline(5, double, toText, upperCase));

// applyPipeline(5, double, upperCase); // Второй шаг ожидает строку, а получает число.
