import React, { useState } from 'react';
import Alert from '@mui/material/Alert';
import './AddForm.css'
import { useEffect } from 'react';

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

	const [disabled, setDisabled] = useState(true)

	useEffect(() => {
		let count = 0
		Object.keys(errors).forEach(key => {
			if (errors[key] !== '') count++
		})
		if (count === 0) setDisabled(false)
		else setDisabled(true)
	},[errors])

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
		<form onSubmit={handleOnSubmit} className='addForm'>
			<div className='inputContainer'>
				<label>Concept</label>
				<input
					name="concept"
					value={input.concept}
					onChange={handleInputChange}
				/>
				{errors.concept && <Alert className='inputAlert' severity="error">{errors.concept}</Alert>}
			</div>
			<div className='inputContainer'>
				<label>Amount</label>
				<input
					type="number"
					name="amount"
					min="1"
					value={input.amount}
					onChange={handleInputChange}
				/>
				{errors.amount && <Alert className='inputAlert' severity="error">{errors.amount}</Alert>}
			</div>
			<div className='inputContainer'>
				<label>Type</label>
				<select name="type" value={input.type} onChange={handleInputChange}>
					<option value="none"></option>
					<option value="income">Income</option>
					<option value="expense">Expense</option>
				</select>
				{errors.type && <Alert className='inputAlert' severity="error">{errors.type}</Alert>}
			</div>
			<div className='inputContainer'>
				<label>Category</label>
				<select
					name="category"
					value={input.category}
					onChange={handleInputChange}
				>
					<option value="none"></option>
					<option value="all">All</option>
				</select>
				{errors.category && <Alert className='inputAlert' severity="error">{errors.category}</Alert>}
			</div>
			<div className='inputContainer'>
				<label>Date</label>
				<input
					type="date"
					max={today}
					name="date"
					value={input.date}
					onChange={handleInputChange}
				/>
			</div>
			<div  className='inputContainer'>
				<input type="submit" value="ADD" className='formSubmitBtn' disabled={disabled}/>
			</div>
		</form>
	);
}

export default AddForm;

/*  */
