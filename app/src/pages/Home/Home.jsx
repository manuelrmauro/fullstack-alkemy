import React from 'react';
import PieChart from '../../components/PieChart/PieChart.jsx';
import Table from '../../components/Table/Table'

function Home() {
	return <div>
    <PieChart title='Balance'></PieChart>
    <PieChart title='Incomes by category'></PieChart>
    <PieChart title='Expenses by category'></PieChart>
    <Table/>
  </div>;
}

export default Home;
