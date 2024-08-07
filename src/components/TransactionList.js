import React, { useState } from 'react';

const TransactionList = ({ transactions }) => {
  const [data, setData] = useState(transactions);
  const [filter, setFilter] = useState('');
  const [sortKey, setSortKey] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [editableTransactionId, setEditableTransactionId] = useState(null);
  const [editedTransaction, setEditedTransaction] = useState(null);
  const [newTransaction, setNewTransaction] = useState({
    transactionId: '',
    customerId: '',
    customerName: '',
    purchaseDate: '',
    productPurchased: '',
    price: '',
  });

  // Filtered and sorted transactions
  const filteredTransactions = data.filter((transaction) =>
    transaction.customerName.toLowerCase().includes(filter.toLowerCase())
  );

  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    if (sortKey === 'price') {
      return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
    } else if (sortKey === 'date') {
      const dateA = new Date(a.purchaseDate);
      const dateB = new Date(b.purchaseDate);
      return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (key) => {
    if (sortKey === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const handleEditClick = (transaction) => {
    setEditableTransactionId(transaction.transactionId);
    setEditedTransaction({ ...transaction });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveClick = () => {
    setData((prevData) =>
      prevData.map((t) =>
        t.transactionId === editableTransactionId ? editedTransaction : t
      )
    );
    setEditableTransactionId(null);
    setEditedTransaction(null);
  };

  const handleCancelClick = () => {
    setEditableTransactionId(null);
    setEditedTransaction(null);
  };

  const handleNewInputChange = (e) => {
    const { name, value } = e.target;
    setNewTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTransaction = () => {
    setData((prevData) => [...prevData, { ...newTransaction, price: parseFloat(newTransaction.price) }]);
    setNewTransaction({
      transactionId: '',
      customerId: '',
      customerName: '',
      purchaseDate: '',
      productPurchased: '',
      price: '',
    });
  };

  return (
    <div>
      <h2>Transaction List</h2>
      <div>
        <input
          type="text"
          placeholder="Filter by customer name"
          value={filter}
          onChange={handleFilterChange}
        />
        <button onClick={() => handleSortChange('date')}>
          Sort by Date ({sortOrder})
        </button>
        <button onClick={() => handleSortChange('price')}>
          Sort by Price ({sortOrder})
        </button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Purchase Date</th>
            <th>Product Purchased</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTransactions.map((transaction) => (
            <tr key={transaction.transactionId}>
              {editableTransactionId === transaction.transactionId ? (
                <>
                  <td>{transaction.transactionId}</td>
                  <td>{transaction.customerId}</td>
                  <td>
                    <input
                      type="text"
                      name="customerName"
                      value={editedTransaction.customerName}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="date"
                      name="purchaseDate"
                      value={editedTransaction.purchaseDate}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="productPurchased"
                      value={editedTransaction.productPurchased}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      name="price"
                      value={editedTransaction.price}
                      onChange={handleInputChange}
                    />
                  </td>
                  <td>
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                  </td>
                </>
              ) : (
                <>
                  <td>{transaction.transactionId}</td>
                  <td>{transaction.customerId}</td>
                  <td>{transaction.customerName}</td>
                  <td>{transaction.purchaseDate}</td>
                  <td>{transaction.productPurchased}</td>
                  <td>${transaction.price.toFixed(2)}</td>
                  <td>
                    <button onClick={() => handleEditClick(transaction)}>Edit</button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Add New Transaction</h3>
      <div>
        <input
          type="text"
          placeholder="Transaction ID"
          name="transactionId"
          value={newTransaction.transactionId}
          onChange={handleNewInputChange}
        />
        <input
          type="text"
          placeholder="Customer ID"
          name="customerId"
          value={newTransaction.customerId}
          onChange={handleNewInputChange}
        />
        <input
          type="text"
          placeholder="Customer Name"
          name="customerName"
          value={newTransaction.customerName}
          onChange={handleNewInputChange}
        />
        <input
          type="date"
          placeholder="Purchase Date"
          name="purchaseDate"
          value={newTransaction.purchaseDate}
          onChange={handleNewInputChange}
        />
        <input
          type="text"
          placeholder="Product Purchased"
          name="productPurchased"
          value={newTransaction.productPurchased}
          onChange={handleNewInputChange}
        />
        <input
          type="number"
          placeholder="Price"
          name="price"
          value={newTransaction.price}
          onChange={handleNewInputChange}
        />
        <button onClick={handleAddTransaction}>Add Transaction</button>
      </div>
    </div>
  );
};

export default TransactionList;
