import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserMonthlyRewards from './components/rewards/UserMonthlyRewards';
import TotalRewards from './components/rewards/TotalRewards';
import TransactionTable from './components/transactions/TransactionTable';
import TransactionList from './components/transactions/TransactionList';
import UseFetchTransaction from './components/purecomponent/UseFetchTransaction';
import ErrorPage from './components/errors/ErrorPage';
import ErrorBoundary from './components/errors/ErrorBoundary'; // Import ErrorBoundary

const timeoutDuration = process.env.REACT_APP_TIMEOUT_DURATION || 1000;

function App() {
  const { data, loading, error } = UseFetchTransaction(timeoutDuration);

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
        
        {error ? (
          <ErrorPage message={error} />
        ) : (
          !loading && (
            <ErrorBoundary> {/* Wrap with ErrorBoundary */}
              <Routes>
                <Route path="/" element={<TransactionTable transactions={data} />} />
                <Route path="/monthly-rewards" element={<UserMonthlyRewards transactions={data} />} />
                <Route path="/total-rewards" element={<TotalRewards transactions={data} />} />
                <Route path="/transaction-list" element={<TransactionList transactions={data} />} />
              </Routes>
            </ErrorBoundary>
          )
        )}
      </div>
    </Router>
  );
}

export default App;