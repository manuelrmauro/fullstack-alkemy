import React, { useState } from 'react';
import Alert from '@mui/material/Alert';

function AddForm() {
	//date
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	if (dd < 10) {
		dd = '0' + dd;
	}
	if (mm < 10) {
		mm = '0' + mm;
	}
	today = yyyy + '-' + mm + '-' + dd;

	//Inputs
	const [input, setInput] = useState({
		type: 'none',
		category: 'none',
		concept: '',
		amount: '',
		date: today,
	});

	const [errors, setErrors] = useState({
		type: '',
		category: '',
		concept: '',
		amount: '',
	});

	const handleErrors = ( props ) => {

		let finalErrors = { ...errors };
		for (let key in props) {
			switch (key) {
				case 'type':
					if (props[key] === 'none') {
						finalErrors = { ...finalErrors, type: 'You must select a type' };
					} else finalErrors = { ...finalErrors, type: '' };
					break;
				case 'category':
					if (props[key] === 'none') {
						finalErrors = { ...finalErrors, category: 'You must select a category' };
					} else finalErrors = { ...finalErrors, category: '' };
					break;
				case 'concept':
					if (!props[key].length) {
						finalErrors = { ...finalErrors, concept: 'You must select a concept' };
					} else finalErrors = { ...finalErrors, concept: '' };
					break;
				case 'amount':
					if (props[key] <= 0) {
						finalErrors = { ...finalErrors, amount: 'You must select an amount' };
					} else finalErrors = { ...finalErrors, amount: '' };
					break;
				default:
					break;
			}
		}
    console.log(finalErrors)
		setErrors(finalErrors);
	};

	const handleInputChange = (e) => {
		e.preventDefault();
		setInput({ ...input, [e.target.name]: e.target.value });
    handleErrors({[e.target.name] : e.target.value})
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
    handleErrors(input)
	};

	return (
		<form onSubmit={handleOnSubmit}>
			<div>
				<label>Type</label>
				<select name="type" value={input.type} onChange={handleInputChange}>
					<option value="none"></option>
					<option value="income">Income</option>
					<option value="expense">Expense</option>
				</select>
				{errors.type && <Alert severity="error">{errors.type}</Alert>}
			</div>
			<div>
				<label>Category</label>
				<select
					name="category"
					value={input.category}
					onChange={handleInputChange}
				>
					<option value="none"></option>
					<option value="all">All</option>
				</select>
				{errors.category && <Alert severity="error">{errors.category}</Alert>}
			</div>
			<div>
				<label>Concept</label>
				<input
					name="concept"
					value={input.concept}
					onChange={handleInputChange}
				/>
				{errors.concept && <Alert severity="error">{errors.concept}</Alert>}
			</div>
			<div>
				<label>Amount</label>
				<input
					type="number"
					name="amount"
					min="1"
					value={input.amount}
					onChange={handleInputChange}
				/>
				{errors.amount && <Alert severity="error">{errors.amount}</Alert>}
			</div>
			<div>
				<label>Date</label>
				<input
					type="date"
					max={today}
					name="date"
					value={input.date}
					onChange={handleInputChange}
				/>
			</div>
			<div>
				<input type="submit" value="Add" />
			</div>
		</form>
	);
}

export default AddForm;

/*  */
