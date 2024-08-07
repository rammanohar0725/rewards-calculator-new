import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserMonthlyRewards from './components/UserMonthlyRewards';
import TotalRewards from './components/TotalRewards';
import TransactionTable from './components/TransactionTable';
import TransactionList from './components/TransactionList'; 
import transactions from './data/transactions.json';
import log from './utils/logger'; 
function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // State for loading
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    //  data fetching
    const fetchData = async () => {
      try {
        log.debug('Fetching transactions data...');
        setLoading(true);

        //  delay for data fetching
        setTimeout(() => {
          setData(transactions);
          setLoading(false);
          log.debug('Transactions data fetched successfully:', transactions);
        }, 1000);

      } catch (err) {
        setLoading(false);
        setError('Error loading data');
        log.error('Error fetching transactions data:', err);
      }
    };

    fetchData();
  }, []);

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

        {loading && <div>Loading...</div>} {/* Display loading indicator */}
        {error && <div>{error}</div>} {/* Display error message if any */}

        {!loading && !error && ( // Render content only if not loading and no error
          <Routes>
            <Route path="/" element={<TransactionTable transactions={data} />} />
            <Route path="/monthly-rewards" element={<UserMonthlyRewards transactions={data} />} />
            <Route path="/total-rewards" element={<TotalRewards transactions={data} />} />
            <Route path="/transaction-list" element={<TransactionList transactions={data} />} /> 
          </Routes>
        )}
      </div>
    </Router>
  );
}

export default App;
