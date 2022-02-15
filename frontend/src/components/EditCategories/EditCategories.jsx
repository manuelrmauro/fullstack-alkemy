import React, { useState } from 'react';
import { useEffect } from 'react';
import { apiWithToken } from '../../services/api';
import Swal from 'sweetalert2'

function EditCategories({onRefresh}) {
	const [input, setInput] = useState({
		type: '',
		name: '',
	});

	const [errors, setErrors] = useState({
		type: '',
		name: '',
	});

	const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    
    let count = 0
    for (let key in input) {
      if (input[key] === '') count++
    }
    for (let key in errors) {
      if (errors[key] !== '') count++
    }
    if (count === 0) setDisabled(false)
    else setDisabled(true)
  },[input, errors])


	const handleErrors = (props) => {
		let finalErrors = { ...errors };
		for (let key in props) {
			switch (key) {
				case 'type':
					if (props[key] === '') {
						finalErrors = { ...finalErrors, type: 'You must select a type' };
					} else finalErrors = { ...finalErrors, type: '' };
					break;
				case 'name':
					if (props[key] === '') {
						finalErrors = {
							...finalErrors,
							name: 'You must enter a name',
						};
					} else finalErrors = { ...finalErrors, name: '' };
					break;
				default:
					break;
			}
		}
		setErrors(finalErrors);
	};

	const handleInputChange = (e) => {
		e.preventDefault();
    if (e.target.name === 'name') {
      const name =e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1).toLowerCase()
      e.target.value =  name
    }
		setInput({ ...input, [e.target.name]: e.target.value });
		handleErrors({ [e.target.name]: e.target.value });
	};

  const handleSubmit = (e) => {
    e.preventDefault()
    apiWithToken.post('/categories', input).then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Category created',
      })
      onRefresh()
    }).catch(err => {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: err.response.data.message || 'Internal server error',
      });
    })
  }

	return (
		<div className='modalContainer' >
			<h2>New category</h2>
			<div className="inputContainer">
				{errors.name ? (
					<label className="inputAlert">{errors.name}</label>
				) : (
					<label>Name</label>
				)}
				<input type="text" onChange={handleInputChange} name='name'/>
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
				<input
					type="button"
					value="ADD"
					className="formSubmitBtn"
					disabled={disabled}
          onClick={handleSubmit}
				/>
			</div>
		</div>
	);
}

export default EditCategories;
