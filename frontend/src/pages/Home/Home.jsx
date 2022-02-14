import React, { useState, useEffect } from 'react';
import { apiWithToken } from '../../services/api';
import PieChart from '../../components/PieChart/PieChart.jsx';
import Table from '../../components/Table/Table';
import './Home.css';
import Loading from '../Loading/Loading'

function Home() {
	const [input, setInput] = useState('balance');

	const [resume, setResume] = useState({});
	const [balance, setBalance] = useState([]);

	useEffect(() => {
		apiWithToken.get('/operations/resume').then((data) => {
			setResume(data.data);
		});
	}, []);

	useEffect(() => {
		if (resume.totalIncomes && resume.totalExpenses) {
			setBalance([
				{ category: 'Incomes', area: resume.totalIncomes },
				{ category: 'Expenses', area: resume.totalExpenses },
			]);
		} else if (resume.totalIncomes)
			setBalance([{ category: 'Incomes', area: resume.totalIncomes }]);
		else if (resume.totalExpenses)
			setBalance([{ category: 'Expenses', area: resume.totalExpenses }]);
		if (Number.isInteger(resume.total)) {
			let total;
			if (resume.total < 0) {
				total = `-$${resume.total * -1}`;
			} else {
				total = `$${resume.total}`;
			}
			setResume({ ...resume, total });
		}
	}, [resume]);

	const handleInputChange = (e) => {
		e.preventDefault();
		setInput(e.target.value);
	};

	return (
		<div>
			{Object.keys(resume).length === 0 ? (
				<Loading/>
			) : (
				<div className="homeContainer section">
					<div className="totalContainer">
						<h2 className="totalTitle">Total</h2>
						<p className="total">{resume.total}</p>
					</div>
					<div>
						{resume.operations && resume.operations.length === 0 && (
							<p style={{ margin: 0 }}>You haven't done any operation yet...</p>
						)}
						{resume.operations && resume.operations.length > 0 && (
							<div className="filter">
								<label>Order by</label>
								<select value={input} onChange={handleInputChange}>
									<option value="balance">Balance</option>
									<option value="incomes">Incomes</option>
									<option value="expenses">Expenses</option>
								</select>
							</div>
						)}
						{resume.operations && resume.operations.length > 0 && (
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
						)}
					</div>
					{resume.operations && resume.operations.length > 0 && (
						<Table type="Last moves" data={resume.operations} />
					)}
				</div>
			)}
		</div>
	);
}

export default Home;
