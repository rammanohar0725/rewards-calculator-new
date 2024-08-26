import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserMonthlyRewards from './UserMonthlyRewards';
import { calculateRewards } from './rewardsCalculator';
import log from '../../utils/logger';
import { getMonthName, getYear } from '../../utils/dateHelpers';

jest.mock('../../utils/logger', () => ({
  debug: jest.fn(),
  error: jest.fn(),
}));

jest.mock('./rewardsCalculator', () => ({
  calculateRewards: jest.fn(price => Math.floor(price * 0.1)),
}));

jest.mock('../../utils/dateHelpers', () => ({
  getMonthName: jest.fn(date => new Date(date).toLocaleString('default', { month: 'long' })),
  getYear: jest.fn(date => new Date(date).getFullYear()),
}));

const mockTransactions = [
  {
    transactionId: 't001',
    customerId: 'c001',
    customerName: 'Amit',
    purchaseDate: '2024-06-15',
    productPurchased: 'Laptop',
    price: 800,
  },
  {
    transactionId: 't002',
    customerId: 'c002',
    customerName: 'Emily',
    purchaseDate: '2024-05-10',
    productPurchased: 'Smartphone',
    price: 600,
  },
  {
    transactionId: 't003',
    customerId: 'c003',
    customerName: 'John',
    purchaseDate: '2024-04-05',
    productPurchased: 'Tablet',
    price: 400,
  },
];

describe('UserMonthlyRewards Component', () => {
  it('handles empty transactions array', () => {
    render(<UserMonthlyRewards transactions={[]} />);
    expect(screen.queryByText(/June-2024/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/May-2024/i)).not.toBeInTheDocument();
  });

  it('calculates reward points correctly', () => {
    render(<UserMonthlyRewards transactions={mockTransactions} />);
    expect(screen.getByText('80')).toBeInTheDocument(); // 10% of 800
    expect(screen.getByText('60')).toBeInTheDocument(); // 10% of 600
    expect(screen.getByText('40')).toBeInTheDocument(); // 10% of 400
  });

  it('sorts transactions by date', () => {
    render(<UserMonthlyRewards transactions={mockTransactions} />);
    const transactionElements = screen.getAllByText((content, element) =>
      element.tagName.toLowerCase() === 'td' && /Transaction ID: t00[123]/.test(content)
    );
    expect(transactionElements[0]).toHaveTextContent('Transaction ID: t003');
    expect(transactionElements[1]).toHaveTextContent('Transaction ID: t002');
    expect(transactionElements[2]).toHaveTextContent('Transaction ID: t001');
  });

  it('groups transactions by month and year', () => {
    render(<UserMonthlyRewards transactions={mockTransactions} />);
    expect(screen.getByText('June-2024')).toBeInTheDocument();
    expect(screen.getByText('May-2024')).toBeInTheDocument();
  });

  it('logs debug information', () => {
    render(<UserMonthlyRewards transactions={mockTransactions} />);
    expect(log.debug).toHaveBeenCalledWith('Monthly rewards calculated:', expect.any(Object));
  });
});
