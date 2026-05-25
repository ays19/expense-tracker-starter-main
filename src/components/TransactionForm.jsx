import { useState, useEffect } from 'react';
import { CATEGORIES } from '../constants/categories';

function TransactionForm({ onAddTransaction }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState(CATEGORIES.expense[0]);

  useEffect(() => {
    setCategory(CATEGORIES[type][0]);
  }, [type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const parsedAmount = parseFloat(amount);
    if (!description || isNaN(parsedAmount) || parsedAmount <= 0) return;

    onAddTransaction({
      description,
      amount: parsedAmount,
      type,
      category,
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory(CATEGORIES.expense[0]);
  };

  return (
    <div className="add-transaction">
      <h2>Add Transaction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="description" className="sr-only">Description</label>
          <input
            id="description"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="amount" className="sr-only">Amount</label>
          <input
            id="amount"
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="type" className="sr-only">Transaction Type</label>
          <select 
            id="type" 
            value={type} 
            onChange={(e) => setType(e.target.value)}
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="category" className="sr-only">Category</label>
          <select 
            id="category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES[type].map(cat => (
              <option key={cat} value={cat.toLowerCase()}>{cat}</option>
            ))}
          </select>
        </div>
        <button type="submit">Add</button>
      </form>
    </div>
  );
}

export default TransactionForm;
