import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

// Simulated components for the demo
const UserMonthlyRewards = ({ transactions }) => <div>User Monthly Rewards Page</div>;
const TotalRewards = ({ transactions }) => <div>Total Rewards Page</div>;
const TransactionTable = ({ transactions }) => (
  <div>
    <h2>Transaction Table</h2>
    <ul>
      {transactions.map((transaction) => (
        <li key={transaction.transactionId}>
          {transaction.customerName} - ${transaction.price}
        </li>
      ))}
    </ul>
  </div>
);
const TransactionList = ({ transactions }) => <div>Transaction List Page</div>;

// Error Page Component
const ErrorPage = ({ message }) => {
  return (
    <div>
      <h2>Error Page</h2>
      <p>{message || "An unexpected error occurred."}</p>
      <Link to="/">Go Back to Home</Link>
    </div>
  );
};

// Logger simulation
const log = {
  debug: console.log,
  error: console.error,
};

// Main App Component
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        log.debug('Fetching transactions data...');
        setLoading(true);

        // Simulate an error to test the error page
        throw new Error('Simulated error for testing');

        // Uncomment the following lines to fetch data normally
        // setTimeout(() => {
        //   const transactions = [
        //     { transactionId: 't001', customerName: 'John Doe', price: 100 },
        //     { transactionId: 't002', customerName: 'Jane Smith', price: 200 },
        //   ];
        //   setData(transactions);
        //   setLoading(false);
        //   log.debug('Transactions data fetched successfully:', transactions);
        // }, 1000);
      } catch (err) {
        setLoading(false);
        setError('Error loading data: ' + err.message);
        log.error('Error fetching transactions data:', err);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<ErrorPage message={error} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <Router>
      <div className="App">
        <h1>Rewards Program</h1>
        <nav>
          <ul>
            <li><Link to="/">Transactions</Link></li>
            <li><Link to="/monthly-rewards">User Monthly Rewards</Link></li>
            <li><Link to="/total-rewards">Total Rewards</Link></li>
            <li><Link to="/transaction-list">Edit Transaction List</Link></li>
          </ul>
        </nav>

        {loading && <div>Loading...</div>}

        {!loading && (
          <Routes>
            <Route path="/" element={<TransactionTable transactions={data} />} />
            <Route path="/monthly-rewards" element={<UserMonthlyRewards transactions={data} />} />
            <Route path="/total-rewards" element={<TotalRewards transactions={data} />} />
            <Route path="/transaction-list" element={<TransactionList transactions={data} />} />
            <Route path="*" element={<ErrorPage message="Page not found" />} />
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
ss