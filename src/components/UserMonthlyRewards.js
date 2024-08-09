import React, { useMemo } from 'react';
import { calculateRewards } from '../utils/rewardsCalculator';
import { getMonthName, getYear } from '../utils/dateHelpers';
import log from '../utils/logger';

const UserMonthlyRewards = ({ transactions }) => {
  const filteredRewards = useMemo(() => {
    const currentDate = new Date();
    const threeMonthsAgo = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1);

    return transactions
      .filter(transaction => {
        const transactionDate = new Date(transaction.purchaseDate);
        return transactionDate >= threeMonthsAgo;
      })
      .sort((a, b) => new Date(a.purchaseDate) - new Date(b.purchaseDate))
      .reduce((acc, transaction) => {
        const { customerId, customerName, purchaseDate, price } = transaction;
        const month = getMonthName(purchaseDate);
        const year = getYear(purchaseDate);
        const key = `${month}-${year}`;

        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push({
          customerId,
          customerName,
          purchaseDate,
          price,
          rewardPoints: calculateRewards(price),
        });

        return acc;
      }, {});
  }, [transactions]);

  try {
    log.debug('Monthly rewards calculated:', filteredRewards);

    return (
      <div>
        <h2>User Monthly Rewards</h2>
        {Object.entries(filteredRewards).map(([monthYear, transactions]) => (
          <div key={monthYear}>
            <h3>{monthYear}</h3>
            <table>
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Customer ID</th>
                  <th>Name</th>
                  <th>Purchase Date</th>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Reward Points</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index}>
                    <td>{transaction.transactionId}</td>
                    <td>{transaction.customerId}</td>
                    <td>{transaction.customerName}</td>
                    <td>{transaction.purchaseDate}</td>
                    <td>{transaction.productPurchased}</td>
                    <td>${transaction.price.toFixed(2)}</td>
                    <td>{transaction.rewardPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    );
  } catch (error) {
    log.error('Error calculating user monthly rewards:', error);
    return <div>Error calculating user monthly rewards. Please try again later.</div>;
  }
};

export default UserMonthlyRewards;
