import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UserMonthlyRewards from './UserMonthlyRewards';

jest.mock('./CalculateRewards', () => ({
  CalculateRewards: jest.fn(),
}));

jest.mock('../../utils/DateHelpers', () => ({
  getMonthName: jest.fn(),
  getYear: jest.fn(),
}));

jest.mock('../../utils/Logger', () => ({
  debug: jest.fn(),
  error: jest.fn(),
}));

const mockTransactions = [
  {
    transactionId: 'TX001',
    customerId: 'CUST001',
    customerName: 'Alice',
    purchaseDate: '2024-09-15T10:30:00Z',
    productPurchased: 'Headphones',
    price: 200,
  },
  {
    transactionId: 'TX002',
    customerId: 'CUST002',
    customerName: 'Bob',
    purchaseDate: '2024-09-18T14:00:00Z',
    productPurchased: 'Smartphone',
    price: 800,
  },
  {
    transactionId: 'TX003',
    customerId: 'CUST003',
    customerName: 'Charlie',
    purchaseDate: '2024-08-05T12:15:00Z',
    productPurchased: 'Tablet',
    price: 500,
  },
];

describe('UserMonthlyRewards Component', () => {
  let consoleErrorSpy;

  beforeAll(() => {
    // Mock console.error to ignore any errors printed to the console
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    // Restore the original console.error after the tests
    consoleErrorSpy.mockRestore();
  });

  test('renders the table with correct headers and transactions', () => {
    render(<UserMonthlyRewards transactions={mockTransactions} />);

    // Check if the main heading is present
    expect(screen.getByText('User Monthly Rewards')).toBeInTheDocument();

    // Ensure table headers are present
    expect(screen.getByText('Transaction ID')).toBeInTheDocument();
    expect(screen.getByText('Customer ID')).toBeInTheDocument();
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Purchase Date')).toBeInTheDocument();
    expect(screen.getByText('Product')).toBeInTheDocument();
    expect(screen.getByText('Price')).toBeInTheDocument();
    expect(screen.getByText('Reward Points')).toBeInTheDocument();

    // Check if transaction data is rendered correctly
    expect(screen.getByText('TX001')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('Headphones')).toBeInTheDocument();
    expect(screen.getByText('$200.00')).toBeInTheDocument();

    expect(screen.getByText('TX002')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('Smartphone')).toBeInTheDocument();
    expect(screen.getByText('$800.00')).toBeInTheDocument();
  });

  test('handles empty transactions list', () => {
    render(<UserMonthlyRewards transactions={[]} />);

    // Check if the main heading is still present
    expect(screen.getByText('User Monthly Rewards')).toBeInTheDocument();

    // Check that no transaction rows are rendered
    expect(screen.queryByText('Transaction ID')).not.toBeInTheDocument();
    expect(screen.queryByText('Alice')).not.toBeInTheDocument();
    expect(screen.queryByText('Bob')).not.toBeInTheDocument();
  });


  test('sorts transactions by purchase date', () => {
    render(<UserMonthlyRewards transactions={mockTransactions} />);

    // Check that the transactions are sorted by date (ascending)
    const transactionIds = screen.getAllByText(/TX00[1-3]/).map((el) => el.textContent);
    expect(transactionIds).toEqual(['TX003', 'TX001', 'TX002']); // Sorted by date: TX003 (Aug), TX001 (Sept 15), TX002 (Sept 18)
  });

  test('handles large transaction amounts and IDs', () => {
    const largeTransactions = [
      {
        transactionId: 'TX9999999999',
        customerId: 'CUST9999999999',
        customerName: 'Giant Corporation',
        purchaseDate: '2024-10-10T10:00:00Z',
        productPurchased: 'Supercomputer',
        price: 1000000000,
      },
    ];

    render(<UserMonthlyRewards transactions={largeTransactions} />);

    // Check if large transaction details are rendered correctly
    expect(screen.getByText('TX9999999999')).toBeInTheDocument();
    expect(screen.getByText('CUST9999999999')).toBeInTheDocument();
    expect(screen.getByText('Giant Corporation')).toBeInTheDocument();
    expect(screen.getByText('$1000000000.00')).toBeInTheDocument();
  });
});