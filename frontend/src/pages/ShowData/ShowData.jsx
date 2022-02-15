import React, { useState, useEffect } from 'react';
import { apiWithToken } from '../../services/api';
import Table from '../../components/Table/Table';
import './ShowData.css';
import Loading from '../Loading/Loading';

function ShowData({ type }) {
	const [data, setData] = useState([]);
	const [searching, setSearching] = useState(true);
	const [categories, setCategories] = useState([]);
	const [finalCategories, setFinalCategories] = useState([]);
	const [input, setInput] = useState('all');

	const [refreshTable, setRefreshTable] = useState(false);
	const handleRefreshTable = () => {
		setRefreshTable(true);
	};

	useEffect(() => {
		if (type === 'Incomes') {
			apiWithToken
				.get('/operations?type=income&category=' + input)
				.then((data) => {
					setData(data.data);
					setSearching(false);
				})
				.catch(() => setSearching(false));
			apiWithToken.get('/categories?type=income').then((data) => {
				setCategories(data.data);
			});
		} else if (type === 'Expenses') {
			apiWithToken
				.get('/operations?type=expense&category=' + input)
				.then((data) => {
					setData(data.data);
					setSearching(false);
				})
				.catch(() => setSearching(false));
			apiWithToken.get('/categories?type=expense').then((data) => {
				setCategories(data.data);
			});
		}
		setRefreshTable(false)
	}, [type, input, refreshTable]);

	useEffect(() => {
		setFinalCategories(
			categories.map((category) => (
				<option key={category.id} value={category.id}>
					{category.name}
				</option>
			))
		);
	}, [categories]);

	const handleInputChange = (e) => {
		e.preventDefault();
		setInput(e.target.value);
	};

	return (
		<div>
			{searching ? (
				<Loading />
			) : (
				<div className="showDataContainer section">
					<div className="filter">
						<label>Category</label>
						<select value={input} onChange={handleInputChange}>
							<option key="0" value="all">
								All
							</option>
							){finalCategories && finalCategories}
						</select>
					</div>

					<Table type={type} data={data}  refreshTable={handleRefreshTable}/>
				</div>
			)}
		</div>
	);
}

export default ShowData;
