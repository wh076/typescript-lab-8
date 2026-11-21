export type DeepReadonly<T> = T extends object
  ? { readonly [Key in keyof T]: DeepReadonly<T[Key]> }
  : T;

export function deepFreeze<T>(obj: T): DeepReadonly<T> {
  if (obj !== null && typeof obj === 'object') {
    for (const key of Object.getOwnPropertyNames(obj)) {
      const value: unknown = Reflect.get(obj, key);
      deepFreeze(value);
    }
    Object.freeze(obj);
  }

  // После рекурсивной заморозки все вложенные поля доступны только для чтения.
  return obj as DeepReadonly<T>;
}

const data = deepFreeze({
  course: { title: 'Web-разработка', settings: { year: 2026 } },
  tasks: [{ title: 'TypeScript', done: true }],
});

console.log(data);
console.log('Объект заморожен:', Object.isFrozen(data));
console.log('Вложенный объект заморожен:', Object.isFrozen(data.course));
console.log('Настройки заморожены:', Object.isFrozen(data.course.settings));
console.log('Массив заморожен:', Object.isFrozen(data.tasks));
console.log('Элемент массива заморожен:', Object.isFrozen(data.tasks[0]));

// data.course.settings.year = 2027; // Вложенное поле доступно только для чтения.
// data.tasks[0] = { title: 'Node.js', done: false }; // Элемент массива нельзя заменить.
// data.tasks[0].done = false; // Поле объекта в массиве доступно только для чтения.
