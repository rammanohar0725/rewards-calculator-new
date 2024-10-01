import React from 'react';  
import { CalculateRewards } from '../rewards/CalculateRewards';
import { getMonthName } from '../../utils/dateHelpers';
import log from '../../utils/logger';

const TransactionTable = ({ transactions }) => {
  try {
    log.debug('Transactions data received for table:', transactions);

    return (
      <div>
        <h2>Transactions</h2>
        <table>
          <thead>
            <tr>
              <th>Transaction ID</th>
              <th>Customer ID</th>
              <th>Customer Name</th>
              <th>Purchase Date</th>
              <th>Month</th>
              <th>Product Purchased</th>
              <th>Price</th>
              <th>Reward Points</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              log.debug('Processing transaction:', transaction);

              const rewardPoints = CalculateRewards(transaction.price);
              const monthName = getMonthName(transaction.purchaseDate);

              return (
                <tr key={transaction.transactionId}>
                  <td>{transaction.transactionId}</td>
                  <td>{transaction.customerId}</td>
                  <td>{transaction.customerName}</td>
                  <td>{transaction.purchaseDate}</td>
                  <td>{monthName}</td>
                  <td>{transaction.productPurchased}</td>
                  <td>${transaction.price.toFixed(2)}</td>
                  <td>{rewardPoints}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  } catch (error) {
    log.error('Error rendering transaction table:', error);
    return <div>Error displaying transactions. Please try again later.</div>;
  }
};

export default TransactionTable;
