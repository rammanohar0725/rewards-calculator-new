import React from 'react';
import { render, screen } from '@testing-library/react';
import TotalRewards from './TotalRewards';
import log from '../../utils/logger';
import { calculateRewards } from './rewardsCalculator';
import '@testing-library/jest-dom';

// Mock the logger to avoid cluttering the test output
jest.mock('../../utils/logger', () => ({
  debug: jest.fn(),
  error: jest.fn(),
}));

// Mock the calculateRewards function
jest.mock('./rewardsCalculator', () => ({
  calculateRewards: jest.fn((price) => {
    if (price === 1200) return 2250;
    if (price === 800) return 1350;
    return 0;
  }),
}));

// Mock transaction data
const mockTransactions = [
  {
    transactionId: 't001',
    customerId: 'c001',
    customerName: 'Amit',
    purchaseDate: '2023-12-15',
    productPurchased: 'Laptop',
    price: 1200, // 2250 reward points
  },
  {
    transactionId: 't002',
    customerId: 'c002',
    customerName: 'Emily',
    purchaseDate: '2024-01-16',
    productPurchased: 'Smartphone',
    price: 800, // 1350 reward points
  },
];

describe('TotalRewards Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders table headers correctly', () => {
    render(<TotalRewards transactions={mockTransactions} />);
    expect(screen.getByText('Customer Name')).toBeInTheDocument();
    expect(screen.getByText('Total Rewards')).toBeInTheDocument();
  });

  it('renders customer names correctly', () => {
    render(<TotalRewards transactions={mockTransactions} />);
    expect(screen.getByText('Amit')).toBeInTheDocument();
    expect(screen.getByText('Emily')).toBeInTheDocument();
  });

  it('calculates and displays total rewards correctly', () => {
    render(<TotalRewards transactions={mockTransactions} />);
    expect(screen.getByText('2250')).toBeInTheDocument();
    expect(screen.getByText('1350')).toBeInTheDocument();
  });

 

  it('handles edge case of zero price transactions', () => {
    const zeroPriceTransactions = [
      {
        transactionId: 't003',
        customerId: 'c003',
        customerName: 'John',
        purchaseDate: '2024-02-20',
        productPurchased: 'Book',
        price: 0, // 0 reward points
      },
    ];
    render(<TotalRewards transactions={zeroPriceTransactions} />);
    expect(screen.getByText('John')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  it('handles large number of transactions correctly', () => {
    const largeTransactions = Array.from({ length: 100 }, (_, index) => ({
      transactionId: `t${index + 1}`,
      customerId: `c${index + 1}`,
      customerName: `Customer ${index + 1}`,
      purchaseDate: `2024-03-${index + 1}`,
      productPurchased: `Product ${index + 1}`,
      price: 100 + index, // Varying prices
    }));
    render(<TotalRewards transactions={largeTransactions} />);
    expect(screen.getByText('Customer 1')).toBeInTheDocument();
    expect(screen.getByText('Customer 100')).toBeInTheDocument();
  });

  it('logs debug information when rendering', () => {
    render(<TotalRewards transactions={mockTransactions} />);
    expect(log.debug).toHaveBeenCalled();
  });

  it('logs error information when calculateRewards throws an error', () => {
    calculateRewards.mockImplementationOnce(() => {
      throw new Error('Test error');
    });
    render(<TotalRewards transactions={mockTransactions} />);
    expect(log.error).toHaveBeenCalledWith('Error calculating total rewards:', expect.any(Error));
  });
});