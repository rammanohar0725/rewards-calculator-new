import { useState, useEffect, useMemo } from 'react';
import log from '../../utils/logger';

const UseFetchTransaction = (timeoutDuration = 1000) => { // Default timeout duration is 1000ms
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        log.debug('Fetching transactions data...');
        setLoading(true);

        const response = await fetch('data/transactions.json');
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }

        const contentType = response.headers.get('content-type');
        log.debug('Content-Type:', contentType);

        if (!contentType || !contentType.includes('application/json')) {
          // Log the response text for debugging non-JSON responses
          const responseText = await response.text();
          log.error('Non-JSON response:', responseText);
          throw new TypeError(`Expected JSON response but received: ${contentType}`);
        }

        const transactions = await response.json();

        setTimeout(() => {
          setData(transactions);
          setLoading(false);
          log.debug('Transactions data fetched successfully:', transactions);
        }, timeoutDuration); // Use the dynamic timeout duration

      } catch (err) {
        setLoading(false);
        setError('Error loading data');
        log.error('Error fetching transactions data:', err);
      }
    };

    fetchData();
  }, [timeoutDuration]); // Add timeoutDuration as a dependency

  // Memoize the transactions data
  const memoizedData = useMemo(() => data, [data]);

  return { data: memoizedData, loading, error };
};

export default UseFetchTransaction;
