import React, { useState, useEffect } from 'react';
import { apiWithToken } from '../../services/api';
import PieChart from '../../components/PieChart/PieChart.jsx';
import Table from '../../components/Table/Table';
import './Home.css';

function Home() {
	const [input, setInput] = useState('balance');

	const [resume, setResume] = useState({});
	const [balance, setBalance] = useState([]);
	useEffect(() => {
		apiWithToken.get('/operations/resume').then((data) => {
			setResume(data.data);
			console.log(data.data);
		});
	}, []);

	useEffect(() => {
		if (resume.totalIncomes && resume.totalExpenses) {
			setBalance([
				{ category: 'Incomes', area: resume.totalIncomes },
				{ category: 'Expenses', area: resume.totalExpenses },
			]);
		}

		if (Number.isInteger(resume.total)) {
			let total 
			if (resume.total < 0) {
				total = `-$${resume.total * -1}`
			} else {
				total = `$${resume.total}`
			}
			setResume({...resume, total})
		}
	}, [resume]);

	const handleInputChange = (e) => {
		e.preventDefault();
		setInput(e.target.value);
	};

	return (
		<div className="homeContainer section">
			<div className='totalContainer'>
					<h2 className='totalTitle'>Total</h2>
					<p className='total'>{resume.total}</p>
				</div>
			<div>
				
				<div className="filter">
					<label>Order by</label>
					<select value={input} onChange={handleInputChange}>
						<option value="balance">Balance</option>
						<option value="incomes">Incomes</option>
						<option value="expenses">Expenses</option>
					</select>
				</div>
				<div>
					{input === 'balance' && (
						<PieChart title="Balance" areas={balance}></PieChart>
					)}
					{input === 'incomes' && (
						<PieChart
							title="Incomes"
							areas={resume.incomesCategories}
						></PieChart>
					)}
					{input === 'expenses' && (
						<PieChart
							title="Expenses"
							areas={resume.expensesCategories}
						></PieChart>
					)}
				</div>
			</div>
			{resume.operations && (
				<Table type="Last moves" data={resume.operations} />
			)}
		</div>
	);
}

export default Home;
