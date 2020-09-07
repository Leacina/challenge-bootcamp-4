import { valueToNode } from '@babel/types';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateRepositoryDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const sumIncome = this.transactions.reduce((acumulation, value) => {
      return value.type === 'income' ? value.value + acumulation : acumulation;
    }, 0);

    const sumOutcome = this.transactions.reduce((acumulation, value) => {
      return value.type === 'outcome' ? value.value + acumulation : acumulation;
    }, 0);

    return {
      income: sumIncome,
      outcome: sumOutcome,
      total: sumIncome - sumOutcome,
    };
  }

  public create({ title, value, type }: CreateRepositoryDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
