import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionTable from './TransactionTable';
import '@testing-library/jest-dom'; 
// Mock the logger to avoid cluttering the test output
jest.mock('../../utils/logger', () => ({
  debug: jest.fn(),
  error: jest.fn(),
}));

// Mock the utility functions
jest.mock('../rewards/rewardsCalculator', () => ({
  calculateRewards: jest.fn((price) => {
    if (price === 1200) return 2250;
    if (price === 800) return 1350;
    return 0;
  }),
}));

jest.mock('../../utils/dateHelpers', () => ({
  getMonthName: jest.fn((date) => {
    if (date === '2023-12-15') return 'December';
    if (date === '2024-01-16') return 'January';
    return 'Unknown';
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

describe('TransactionTable Component', () => {
  it('renders the table with transaction data', () => {
    // Render the component
    render(<TransactionTable transactions={mockTransactions} />);

    // Check for the table headers
    expect(screen.getByText('Transaction ID')).toBeInTheDocument();
    expect(screen.getByText('Customer ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Purchase Date')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Reward Points')).toBeInTheDocument();

    // Check for the transaction data
    expect(screen.getByText('t001')).toBeInTheDocument();
    expect(screen.getByText('c001')).toBeInTheDocument();
    expect(screen.getByText('Amit')).toBeInTheDocument();
    expect(screen.getByText('December')).toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('$1200.00')).toBeInTheDocument();
    expect(screen.getByText('2250')).toBeInTheDocument();

    expect(screen.getByText('t002')).toBeInTheDocument();
    expect(screen.getByText('c002')).toBeInTheDocument();
    expect(screen.getByText('Emily')).toBeInTheDocument();
    expect(screen.getByText('January')).toBeInTheDocument();
    expect(screen.getByText('Smartphone')).toBeInTheDocument();
    expect(screen.getByText('$800.00')).toBeInTheDocument();
    expect(screen.getByText('1350')).toBeInTheDocument();
  });

  it('handles empty transactions array', () => {
    // Render the component with empty transactions
    render(<TransactionTable transactions={[]} />);

    // Check that the table is empty
    expect(screen.queryByText('Transaction ID')).not.toBeInTheDocument();
    expect(screen.queryByText('Customer ID')).not.toBeInTheDocument();
    expect(screen.queryByText('Name')).not.toBeInTheDocument();
    expect(screen.queryByText('Purchase Date')).not.toBeInTheDocument();
    expect(screen.queryByText('Product')).not.toBeInTheDocument();
    expect(screen.queryByText('Price')).not.toBeInTheDocument();
    expect(screen.queryByText('Reward Points')).not.toBeInTheDocument();
  });

  it('calculates reward points correctly', () => {
    // Render the component
    render(<TransactionTable transactions={mockTransactions} />);

    // Check for the correct reward points
    expect(screen.getByText('2250')).toBeInTheDocument();
    expect(screen.getByText('1350')).toBeInTheDocument();
  });

  it('displays correct month names', () => {
    // Render the component
    render(<TransactionTable transactions={mockTransactions} />);

    // Check for the correct month names
    expect(screen.getByText('December')).toBeInTheDocument();
    expect(screen.getByText('January')).toBeInTheDocument();
  });

  it('handles unknown dates correctly', () => {
    const unknownDateTransactions = [
      {
        transactionId: 't003',
        customerId: 'c003',
        customerName: 'John',
        purchaseDate: '2025-02-20',
        productPurchased: 'Tablet',
        price: 500,
      },
    ];

    // Render the component with unknown date transactions
    render(<TransactionTable transactions={unknownDateTransactions} />);

    // Check for the 'Unknown' month name
    expect(screen.getByText('Unknown')).toBeInTheDocument();
  });
});