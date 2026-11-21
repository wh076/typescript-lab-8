export function chunkArray<T>(items: readonly T[], chunkSize: number): T[][] {
  if (!Number.isInteger(chunkSize) || chunkSize <= 0) {
    throw new RangeError('Размер блока должен быть положительным целым числом.');
  }

  const chunks: T[][] = [];
  for (let index = 0; index < items.length; index += chunkSize) {
    chunks.push(items.slice(index, index + chunkSize));
  }
  return chunks;
}

console.log('Числа:', chunkArray([1, 2, 3, 4, 5], 2));
console.log('Строки:', chunkArray(['a', 'b', 'c', 'd'], 2));
console.log('Пустой массив:', chunkArray([], 2));

try {
  console.log(chunkArray([1, 2, 3], 0));
} catch (error) {
  if (error instanceof RangeError) {
    console.log(error.name, error.message);
  } else {
    throw error;
  }
}
