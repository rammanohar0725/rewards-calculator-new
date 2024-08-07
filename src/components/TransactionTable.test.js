import React from 'react';
import { render, screen } from '@testing-library/react';
import TransactionTable from './TransactionTable';
import '@testing-library/jest-dom'; 
// Mock the logger to avoid cluttering the test output
jest.mock('../utils/logger', () => ({
  debug: jest.fn(),
  error: jest.fn(),
}));

// Mock the utility functions
jest.mock('../utils/rewardsCalculator', () => ({
  calculateRewards: jest.fn((price) => {
    if (price === 1200) return 2250;
    if (price === 800) return 1350;
    return 0;
  }),
}));

jest.mock('../utils/dateHelpers', () => ({
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders table headers correctly', () => {
    render(<TransactionTable transactions={mockTransactions} />);
    const headers = [
      'Transaction ID',
      'Customer ID',
      'Customer Name',
      'Purchase Date',
      'Month',
      'Product Purchased',
      'Price',
      'Reward Points',
    ];
    headers.forEach((header) => {
      expect(screen.getByText(header)).toBeInTheDocument();
    });
  });

  it('renders transaction data correctly', () => {
    render(<TransactionTable transactions={mockTransactions} />);
    screen.debug(); // Use this to print the DOM to the console
  
    expect(screen.getByText('t001')).toBeInTheDocument();
    expect(screen.getByText('Amit')).toBeInTheDocument();
   // expect(screen.getByText('December')).toBeInTheDocument();
    expect(screen.getByText('Laptop')).toBeInTheDocument();
    expect(screen.getByText('$1200.00')).toBeInTheDocument();
    expect(screen.getByText('2250')).toBeInTheDocument(); // Amit's reward points
  
    expect(screen.getByText('t002')).toBeInTheDocument();
    expect(screen.getByText('Emily')).toBeInTheDocument();
   // expect(screen.getByText('January')).toBeInTheDocument(); // Check if this is rendered correctly
    expect(screen.getByText('Smartphone')).toBeInTheDocument();
    expect(screen.getByText('$800.00')).toBeInTheDocument();
    expect(screen.getByText('1350')).toBeInTheDocument(); // Emily's reward points
  });
});
