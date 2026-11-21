export interface Repository<T extends { id: string }> {
  create(item: T): T;
  findById(id: string): T | undefined;
  update(id: string, changes: Partial<Omit<T, 'id'>>): T | undefined;
  delete(id: string): boolean;
}

export class MemoryRepository<T extends { id: string }> implements Repository<T> {
  private readonly items = new Map<string, T>();

  create(item: T): T {
    if (this.items.has(item.id)) {
      throw new Error(`Запись с ID ${item.id} уже существует.`);
    }
    this.items.set(item.id, item);
    return item;
  }

  findById(id: string): T | undefined {
    return this.items.get(id);
  }

  update(id: string, changes: Partial<Omit<T, 'id'>>): T | undefined {
    const item = this.findById(id);
    if (!item) {
      return undefined;
    }

    const updated = { ...item, ...changes, id };
    this.items.set(id, updated);
    return updated;
  }

  delete(id: string): boolean {
    return this.items.delete(id);
  }
}

type Book = { id: string; title: string; year: number };

const books = new MemoryRepository<Book>();
const book: Book = { id: 'book-1', title: 'Капитанская дочка', year: 1836 };

console.log('Создание:', books.create(book));
console.log('Поиск:', books.findById(book.id));
console.log('Обновление:', books.update(book.id, { title: 'Капитанская дочка (повесть)' }));

try {
  books.create(book);
} catch (error) {
  if (error instanceof Error) {
    console.log(error.name, error.message);
  } else {
    throw error;
  }
}

console.log('Удаление:', books.delete(book.id));
console.log('Поиск после удаления:', books.findById(book.id));
console.log('Обновление после удаления:', books.update(book.id, { year: 1837 }));
console.log('Повторное удаление:', books.delete(book.id));
