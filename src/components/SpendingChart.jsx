import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d', '#ffc658'];

function SpendingChart({ transactions }) {
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  
  const categoryData = expenseTransactions.reduce((acc, curr) => {
    const existing = acc.find(item => item.name === curr.category);
    if (existing) {
      existing.value += curr.amount;
    } else {
      acc.push({ name: curr.category, value: curr.amount });
    }
    return acc;
  }, []);

  if (categoryData.length === 0) {
    return (
      <div className="spending-chart">
        <h2>Spending by Category</h2>
        <p>No expense data to display</p>
      </div>
    );
  }

  return (
    <div className="spending-chart" style={{ width: '100%', height: '400px' }}>
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={categoryData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" radius={[10, 10, 0, 0]}>
            {categoryData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default SpendingChart;
