export function addTag(tags: readonly string[], tag: string): string[] {
  if (tags.includes(tag)) {
    return [...tags];
  }
  return [...tags, tag];
}

export function removeTag(tags: readonly string[], tag: string): string[] {
  return tags.filter((currentTag) => currentTag !== tag);
}

export function mergeTags(first: readonly string[], second: readonly string[]): string[] {
  return [...new Set([...first, ...second])];
}

const tags = ['web', 'node', 'web'];
const otherTags = ['node', 'Web', 'ts'];

console.log('Добавление:', addTag(tags, 'ts'));
const copy = addTag(tags, 'node');
console.log('Тег уже есть, новый массив:', copy, copy !== tags);
console.log('Удаление:', removeTag(tags, 'web'));
console.log('Объединение:', mergeTags(tags, otherTags));
console.log('Исходные массивы:', tags, otherTags);
