export type Invoice = {
  id: string;
  amount: number;
  status: 'paid' | 'free';
};

export function sumByStatus(invoices: readonly Invoice[]): { paid: number; free: number } {
  return invoices.reduce((totals, invoice) => {
    totals[invoice.status] += invoice.amount;
    return totals;
  }, { paid: 0, free: 0 });
}

const invoices: Invoice[] = [
  { id: '1', amount: 100, status: 'paid' },
  { id: '2', amount: 40, status: 'free' },
  { id: '3', amount: 25, status: 'paid' },
  { id: '4', amount: 10, status: 'free' },
];

console.log('Смешанный набор:', sumByStatus(invoices));
console.log('Пустой массив:', sumByStatus([]));
