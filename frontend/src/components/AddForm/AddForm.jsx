import React, { useState, useEffect } from 'react';
import { apiWithToken } from '../../services/api';
import './AddForm.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import EditCategories from '../../components/EditCategories/EditCategories';

function AddForm({edit, id}) {


	const [open, setOpen] = useState(false);

	const onOpenModal = () => setOpen(true);
	const onCloseModal = () => setOpen(false);

	const navigate = useNavigate();

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

	useEffect(() => {
		if (id !== -1) {
			apiWithToken
				.get('/operations/id/' + id)
				.then((res) => {
					setInput({
						type: res.data.type,
						category:res.data.category_id + (res.data.category.allowDelete ? 'T' : 'F'),
						concept:res.data.concept,
						amount:res.data.amount,
						date:res.data.date,
					});
				})
		}
	}, [id]);

	const [errors, setErrors] = useState({
		type: '',
		category: '',
		concept: '',
		amount: '',
	});

	const [refresh, setRefresh] = useState(false);

	const onRefresh = () => {
		setRefresh(true);
		setOpen(false);
	};

	const [disabled, setDisabled] = useState(true);

	const [categories, setCategories] = useState([]);

	const [mountEdit, setMountEdit] = useState(true)

	let count = 2
	useEffect(() => {
		if (edit && mountEdit) {
			count--
			if(count === 0) {
				setMountEdit(false)
			}
		} else
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
		setRefresh(false);
	}, [input.type, refresh]);

	useEffect(() => {
		let count = 0;
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
		apiWithToken
			.post('/operations', { ...input, category: input.category.slice(0,-1)})
			.then(() => {
				Swal.fire({
					icon: 'success',
					title: 'Success',
					text: 'Operation added',
				}).then(() => {
					navigate('/');
				});
			})
			.catch((err) => {
				Swal.fire({
					icon: 'error',
					title: 'Error',
					text: err.response.data.message || 'Internal server error',
				});
			});
	};

	const handleDeleteCategory = () => {
		Swal.fire({
			title: `Delete this category?`,
			showDenyButton: true,
			confirmButtonText: 'Yes',
			denyButtonText: 'No',
		}).then(() => {
			apiWithToken
				.delete('/categories/' + input.category.slice(0,-1))
				.then(() => {
					Swal.fire({
						icon: 'success',
						title: 'Success',
						text: 'Category deleted',
					})
					setRefresh(true)
				})
				.catch((err) => {
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: err.response.data.message || 'Internal server error',
					});
				});
		});
	};

	const handleEdit = (e) => {
		e.preventDefault()
	}

	return (
		<form onSubmit={edit ? handleEdit : handleOnSubmit} className="form">
			<Modal open={open} onClose={onCloseModal} center>
				<EditCategories onRefresh={onRefresh} />
			</Modal>
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
				<div className="categoryInputContainer">
					<select
						name="category"
						value={input.category}
						onChange={handleInputChange}
						disabled={input.type === 'none'}
					>
						<option value="none"></option>
						{categories.map((category) => (
							<option key={category.id} value={category.id +( category.allowDelete ? 'T': 'F')}>
								{category.name}
							</option>
						))}
					</select>
					<button type="button" onClick={onOpenModal}>
						<AddCircleIcon />
					</button>
					<button  className="deleteBtn" 
						type="button"
						onClick={handleDeleteCategory}
						disabled={input.category.charAt(input.category.length - 1) !== 'T'} 
					>
						<DeleteIcon/>
					</button> 
				</div>
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
