import React from 'react';
import { useState } from 'react';
import './LogOrSignIn.css';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import { startGoogleLogin, startLogin, startRegister } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import GoogleLogin from 'react-google-login'

function LogOrSignIn({ isRegister }) {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const responseGoogleSucces = ({ tokenId }) => {
    dispatch(startGoogleLogin(tokenId));
  };
  const responseGoogleFail = () => {
    navigate('/register', { replace: true });
  };

	const [input, setInput] = useState({
		email: '',
		password: '',
		repeatPassword: '',
	});

	const [errors, setErrors] = useState({
		email: '',
		password: '',
		repeatPassword: '',
	});

	const [disabled, setDisabled] = useState(true);

	useEffect(() => {
		let count = 0;
		Object.keys(input).forEach((key) => {
			if (!isRegister && key === 'repeatPassword') return;
			if (input[key].length === 0) count++;
		});

		Object.keys(errors).forEach((key) => {
			if (!isRegister && key === 'repeatPassword') return;
			if (errors[key].length !== 0) count++;
		});
		if (count === 0) setDisabled(false);
		else setDisabled(true);
	}, [errors, input]);

	const handleInputChange = (e) => {
		e.preventDefault();
		setInput({ ...input, [e.target.name]: e.target.value });
		switch (e.target.name) {
			case 'email':
				if (validator.isEmail(e.target.value)) {
					setErrors({ ...errors, email: '' });
				} else {
					setErrors({ ...errors, email: 'Enter a valid email' });
				}
				break;
			case 'password':
				if (e.target.value.includes(' ')) {
					setErrors({
						...errors,
						password: "Password can't have spaces",
						repeatPassword: '',
					});
				} else if (e.target.value.length < 6) {
					setErrors({
						...errors,
						password: 'Enter a password with 6 or more characters',
						repeatPassword: '',
					});
				} else if (!validator.equals(e.target.value, input.repeatPassword)) {
					setErrors({
						...errors,
						repeatPassword: 'Repeat the password',
						password: '',
					});
				} else {
					setErrors({ ...errors, repeatPassword: '', password: '' });
				}
				break;
			case 'repeatPassword':
				if (validator.equals(e.target.value, input.password)) {
					setErrors({ ...errors, repeatPassword: '' });
				} else {
					setErrors({ ...errors, repeatPassword: 'Repeat the password' });
				}
				break;
			default:
				break;
		}
	};

	const changePage = (e) => {
		e.preventDefault();
		const defaultValues = {
			email: '',
			password: '',
			repeatPassword: '',
		};
		setInput(defaultValues);
		setErrors(defaultValues);
		navigate(isRegister ? '/login' : '/');
	};

	const handleRegisterSubmit = (e) => {
		e.preventDefault();
		dispatch(startRegister(input));
	};

	const handleLoginSubmit = (e) => {
		e.preventDefault();
		dispatch(startLogin(input));
	};

	return (
		<div className="section logOrSignInContainer">
			<form
				className="form"
				onSubmit={isRegister ? handleRegisterSubmit : handleLoginSubmit}
			>
				<h1>{isRegister ? 'Sign in' : 'Log in'}</h1>
				<div className="inputContainer">
					{errors.email ? (
						<label className="inputAlert">{errors.email}</label>
					) : (
						<label>Email</label>
					)}
					<input
						type="text"
						name="email"
						value={input.email}
						onChange={handleInputChange}
						autoComplete="new-username"
					/>
				</div>
				<div className="inputContainer">
					{errors.password ? (
						<label className="inputAlert">{errors.password}</label>
					) : (
						<label>Password</label>
					)}
					<input
						type="password"
						name="password"
						value={input.password}
						onChange={handleInputChange}
						autoComplete="new-password"
					/>
				</div>
				{isRegister && (
					<div className="inputContainer">
						{errors.repeatPassword ? (
							<label className="inputAlert">{errors.repeatPassword}</label>
						) : (
							<label>Repeat password</label>
						)}
						<input
							type="password"
							name="repeatPassword"
							value={input.repeatPassword}
							onChange={handleInputChange}
							autoComplete="new-password"
						/>
					</div>
				)}
				<div className="inputContainer">
					<input
						type="submit"
						value={isRegister ? 'SIGN IN' : 'LOG IN'}
						className="formSubmitBtn"
						disabled={disabled}
					/>
				</div>
					</form>
				<p>
					{isRegister
						? 'Do you already have an account? '
						: "You don't have an account? "}
					<span className="changePage" onClick={changePage}>
						{isRegister ? 'Log in' : 'Sign in'}
					</span>
				</p>
				<GoogleLogin
              clientId="327655390134-3dkok4tsgubva7v5gj7drncddv260lor.apps.googleusercontent.com"
              buttonText="Continue with Google"
              onSuccess={responseGoogleSucces}
              onFailure={responseGoogleFail}
              cookiePolicy="single_host_origin"
              className='googleBtn'
            />
		</div>
	);
}

export default LogOrSignIn;
