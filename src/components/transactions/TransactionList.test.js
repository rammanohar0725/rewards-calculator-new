import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TransactionList from './TransactionList';
import '@testing-library/jest-dom'; // Add this to make `toBeInTheDocument` available

const mockTransactions = [
  {
    transactionId: 'T001',
    customerId: 'C001',
    customerName: 'Alice',
    purchaseDate: '2024-01-10',
    productPurchased: 'Laptop',
    price: 1200,
  },
  {
    transactionId: 'T002',
    customerId: 'C002',
    customerName: 'Bob',
    purchaseDate: '2024-02-15',
    productPurchased: 'Phone',
    price: 800,
  },
];

describe('TransactionList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    // Suppress console.error and console.warn for these tests
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
  });

  afterEach(() => {
    // Restore console.error and console.warn after the tests
    console.error.mockRestore();
    console.warn.mockRestore();
  });

  test('renders transaction list with given data', () => {
    render(<TransactionList transactions={mockTransactions} />);

    // Check for transaction table headers
    expect(screen.getByText('Transaction ID')).toBeInTheDocument();
    expect(screen.getByText('Customer ID')).toBeInTheDocument();

    // Check if transactions are rendered
    expect(screen.getByText('T001')).toBeInTheDocument();
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('$1200.00')).toBeInTheDocument();

    expect(screen.getByText('T002')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('$800.00')).toBeInTheDocument();
  });

  test('filters transactions by customer name', () => {
    render(<TransactionList transactions={mockTransactions} />);

    // Type in the filter input to search for "Bob"
    fireEvent.change(screen.getByPlaceholderText('Filter by customer name'), {
      target: { value: 'Bob' },
    });

    // Check if only Bob's transaction is displayed
    expect(screen.getByText('T002')).toBeInTheDocument();
    expect(screen.queryByText('T001')).not.toBeInTheDocument();
  });

  test('sorts transactions by price', () => {
    render(<TransactionList transactions={mockTransactions} />);

    // Sort by ascending price
    fireEvent.click(screen.getByText('Sort by Price (asc)'));
    const rows = screen.getAllByRole('row');

    // Check if transactions are sorted by ascending price
    expect(rows[1]).toHaveTextContent('Bob'); // First row after header
    expect(rows[2]).toHaveTextContent('Alice'); // Second row after header

    // Sort by descending price
    fireEvent.click(screen.getByText('Sort by Price (asc)'));
    const sortedRows = screen.getAllByRole('row');

    // Check if transactions are sorted by descending price
    expect(sortedRows[1]).toHaveTextContent('Alice'); // First row after header
    expect(sortedRows[2]).toHaveTextContent('Bob'); // Second row after header
  });


  test('edits a transaction', () => {
    render(<TransactionList transactions={mockTransactions} />);

    // Click on the edit button for the first transaction
    fireEvent.click(screen.getAllByText('Edit')[0]);

    // Change the customer name for the transaction
    const customerNameInput = screen.getByDisplayValue('Alice');
    fireEvent.change(customerNameInput, { target: { value: 'Alice Updated' } });

    // Save the edited transaction
    fireEvent.click(screen.getByText('Save'));

    // Check if the updated customer name is displayed
    expect(screen.getByText('Alice Updated')).toBeInTheDocument();
  });

  test('adds a new transaction', () => {
    render(<TransactionList transactions={mockTransactions} />);

    // Fill in the new transaction details
    fireEvent.change(screen.getByPlaceholderText('Transaction ID'), {
      target: { value: 'T003' },
    });
    fireEvent.change(screen.getByPlaceholderText('Customer ID'), {
      target: { value: 'C003' },
    });
    fireEvent.change(screen.getByPlaceholderText('Customer Name'), {
      target: { value: 'Charlie' },
    });
    fireEvent.change(screen.getByPlaceholderText('Purchase Date'), {
      target: { value: '2024-03-01' },
    });
    fireEvent.change(screen.getByPlaceholderText('Product Purchased'), {
      target: { value: 'Tablet' },
    });
    fireEvent.change(screen.getByPlaceholderText('Price'), {
      target: { value: '600' },
    });

    // Click the "Add Transaction" button
    fireEvent.click(screen.getByText('Add Transaction'));

    // Check if the new transaction is added to the table
    expect(screen.getByText('T003')).toBeInTheDocument();
    expect(screen.getByText('Charlie')).toBeInTheDocument();
    expect(screen.getByText('$600.00')).toBeInTheDocument();
  });
});
