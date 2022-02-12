import React, { useState, useEffect } from 'react';
import { apiWithToken } from '../../services/api';
import './AddForm.css';
import {useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'

function AddForm() {
	const navigate = useNavigate()

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

	const [disabled, setDisabled] = useState(true);

	const [categories, setCategories] = useState([]);
	const [finalCategories, setFinalCategories] = useState([]);

	useEffect(() => {
		setInput({ ...input, category: 'none' });
		if (input.type === 'Income') {
			apiWithToken.get('/categories?type=income').then((data) => {
				setCategories(data.data);
			});
		} else if (input.type === 'Expense') {
			apiWithToken.get('/categories?type=expense').then((data) => {
				setCategories(data.data);
			});
		} else {
			setCategories([]);
		}
	}, [input.type]);

	useEffect(() => {
		setFinalCategories(
			categories.map((category) => (
				<option key={category.id} value={category.id}>
					{category.name}
				</option>
			))
		);
	}, [categories]);

	useEffect(() => {
		let count = 0;
		console.log(errors, input)
		Object.keys(input).forEach((key) => {
			if (input[key] === '' || input[key] === 'none') count++;
		});
		Object.keys(errors).forEach((key) => {
			if (errors[key] !== '') count++;
		});
		if (count === 0) setDisabled(false);
		else setDisabled(true);
	}, [errors, input]);

	const handleErrors = (props) => {
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
						finalErrors = {
							...finalErrors,
							category: 'You must select a category',
						};
					} else finalErrors = { ...finalErrors, category: '' };
					break;
				case 'concept':
					if (!props[key].length) {
						finalErrors = {
							...finalErrors,
							concept: 'You must enter a concept',
						};
					} else finalErrors = { ...finalErrors, concept: '' };
					break;
				case 'amount':
					if (props[key] <= 0) {
						finalErrors = {
							...finalErrors,
							amount: 'You must enter an amount',
						};
					} else finalErrors = { ...finalErrors, amount: '' };
					break;
				default:
					break;
			}
		}
		setErrors(finalErrors);
	};

	const handleInputChange = (e) => {
		e.preventDefault();
		setInput({ ...input, [e.target.name]: e.target.value });
		handleErrors({ [e.target.name]: e.target.value });
	};

	const handleOnSubmit = (e) => {
		e.preventDefault();
		handleErrors(input);
		apiWithToken.post('/operations', input).then(() => {
			Swal.fire({
				icon: 'success',
				title: 'Success',
				text: 'Operation added',
			}).then(() => {
				navigate('/')
			})
		}).catch(err => {
			Swal.fire({
				icon: 'error',
				title: 'Error',
				text: err.response.data.message || 'Internal server error',
			});
		})
	};

	return (
		<form onSubmit={handleOnSubmit} className="form">
			<div className="inputContainer">
				{errors.concept ? (
					<label className="inputAlert">{errors.concept}</label>
				) : (
					<label>Concept</label>
				)}
				<input
					name="concept"
					value={input.concept}
					onChange={handleInputChange}
				/>
			</div>
			<div className="inputContainer">
				{errors.amount ? (
					<label className="inputAlert">{errors.amount}</label>
				) : (
					<label>Amount</label>
				)}
				<input
					type="number"
					name="amount"
					min="1"
					value={input.amount}
					onChange={handleInputChange}
				/>
			</div>
			<div className="inputContainer">
				{errors.type ? (
					<label className="inputAlert">{errors.type}</label>
				) : (
					<label>Type</label>
				)}
				<select name="type" value={input.type} onChange={handleInputChange}>
					<option value="none"></option>
					<option value="Income">Income</option>
					<option value="Expense">Expense</option>
				</select>
			</div>
			<div className="inputContainer">
				{errors.category ? (
					<label className="inputAlert">{errors.category}</label>
				) : (
					<label>Category</label>
				)}
				<select
					name="category"
					value={input.category}
					onChange={handleInputChange}
					disabled={input.type === 'none'}
				>
					<option value="none"></option>
					{finalCategories && finalCategories}
				</select>
			</div>
			<div className="inputContainer">
				<label>Date</label>
				<input
					type="date"
					max={today}
					name="date"
					value={input.date}
					onChange={handleInputChange}
				/>
			</div>
			<div className="inputContainer">
				<input
					type="submit"
					value="ADD"
					className="formSubmitBtn"
					disabled={disabled}
				/>
			</div>
		</form>
	);
}

export default AddForm;

/*  */
