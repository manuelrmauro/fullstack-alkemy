import React, { useState } from 'react';
import PieChart from '../../components/PieChart/PieChart.jsx';
import Table from '../../components/Table/Table'

function Home() {

  const [input, setInput] = useState('balance')

  const handleInputChange = (e) => {
    e.preventDefault()
    setInput(e.target.value)
  }

	return <div>
    <div>
      <label>Order by</label>
      <select value={input} onChange={handleInputChange}>
        <option value='balance'>Balance</option>
        <option value='incomes'>Incomes</option>
        <option value='expenses'>Expenses</option>
      </select>
    </div>
    <div>
    {input === 'balance' && <PieChart title='Balance'></PieChart>}
    {input === 'incomes' && <PieChart title='Incomes'></PieChart>}
    {input === 'expenses' && <PieChart title='Expenses'></PieChart>}
    </div>
    <Table type="Last moves"/>
  </div>;
}

export default Home;
