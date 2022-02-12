import React, { useState, useEffect } from 'react';
import { apiWithToken } from '../../services/api';
import Table from '../../components/Table/Table';
import './ShowData.css';

function ShowData({ type }) {
	const [data, setData] = useState([]);

	const [categories, setCategories] = useState([]);
	const [finalCategories, setFinalCategories] = useState([]);

	useEffect(() => {
		if (type === 'Incomes') {
			apiWithToken.get('/operations?type=income').then((data) => {
				setData(data.data);
			});
			apiWithToken.get('/categories?type=income').then((data) => {
				setCategories(data.data);
			});
		} else if (type === 'Expenses') {
			apiWithToken.get('/operations?type=expense').then((data) => {
				setData(data.data);
			});
			apiWithToken.get('/categories?type=expense').then((data) => {
				setCategories(data.data);
			});
		}
	}, [type]);

	useEffect(() => {
		setFinalCategories(
			categories.map((category) => (
				<option key={category.id} value={category.id}>
					{category.name}
				</option>
			))
		);
	}, [categories]);

	return (
		<div className="showDataContainer section">
			{data.length === 0 && (
				<div>
					<h2 style={{ marginTop: 0 }}>{type}</h2>
					<p>
						{type === 'Incomes'
							? "You haven't done any income operation yet... "
							: "You haven't done any expense operation yet... "}
					</p>
				</div>
			)}
			{data.length > 0 && (
				<div className="filter">
					<label>Category</label>
					<select>
						<option key="0" value="all">
							All
						</option>
						){finalCategories && finalCategories}
					</select>
				</div>
			)}
			{data.length > 0 && <Table type={type} data={data} />}
		</div>
	);
}

export default ShowData;
