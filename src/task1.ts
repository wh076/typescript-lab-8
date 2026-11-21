export function formatInput(value: number): string;
export function formatInput(value: string): string;
export function formatInput(value: Date): string;
export function formatInput(value: number | string | Date): string {
  if (value instanceof Date) {
    return value.toISOString();
  }

  switch (typeof value) {
    case 'number':
      return value.toFixed(2);
    case 'string':
      return value.trim();
    default: {
      const unexpectedValue: never = value;
      throw new TypeError(`Неподдерживаемое значение: ${unexpectedValue}`);
    }
  }
}

console.log(formatInput(12.5));
console.log(formatInput('  TypeScript  '));
console.log(formatInput(new Date('2026-01-15T10:00:00Z')));
