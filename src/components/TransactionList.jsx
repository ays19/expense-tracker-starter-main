import { useState, useMemo } from 'react';
import { CATEGORIES } from '../constants/categories';
import { formatCurrency } from '../utils/formatters';

function TransactionList({ transactions, onDeleteTransaction }) {
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");

  // Flatten all categories from both types for the filter dropdown
  const allCategories = useMemo(() => {
    return [...new Set([...CATEGORIES.income, ...CATEGORIES.expense])].map(c => c.toLowerCase());
  }, []);

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchType = filterType === "all" || t.type === filterType;
      const matchCategory = filterCategory === "all" || t.category === filterCategory;
      return matchType && matchCategory;
    });
  }, [transactions, filterType, filterCategory]);

  return (
    <div className="transactions">
      <h2>Transactions</h2>
      <div className="filters">
        <div className="filter-group">
          <label htmlFor="filter-type" className="sr-only">Filter by Type</label>
          <select id="filter-type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="filter-group">
          <label htmlFor="filter-category" className="sr-only">Filter by Category</label>
          <select id="filter-category" value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            <option value="all">All Categories</option>
            {allCategories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <table>
        <caption>Monthly Transaction History</caption>
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Category</th>
            <th>Amount</th>
            {onDeleteTransaction && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.map(t => (
            <tr key={t.id}>
              <td>{t.date}</td>
              <td>{t.description}</td>
              <td>{t.category}</td>
              <td className={t.type === "income" ? "income-amount" : "expense-amount"}>
                {t.type === "income" ? "+" : "-"}{formatCurrency(t.amount)}
              </td>
              {onDeleteTransaction && (
                <td>
                  <button
                    className="delete-btn"
                    aria-label={`Delete transaction ${t.description}`}
                    onClick={() => {
                      if (window.confirm('Are you sure you want to delete this transaction?')) {
                        onDeleteTransaction(t.id);
                      }
                    }}
                  >
                    Delete
                  </button>                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TransactionList;
