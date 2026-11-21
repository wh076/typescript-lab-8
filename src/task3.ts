export type UserId = string & { readonly brand: unique symbol };

export function isUserId(value: unknown): value is UserId {
  return typeof value === 'string' && value.length === 36 &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
}

function getUserProfile(id: UserId) {
  return { id, name: 'Анна' };
}

const values: unknown[] = ['123e4567-e89b-12d3-a456-426614174000', 'invalid-id', 42];

for (const value of values) {
  if (isUserId(value)) {
    console.log(getUserProfile(value));
  } else {
    console.log('Некорректный ID:', value);
  }
}
