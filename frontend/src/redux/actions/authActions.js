import Swal from 'sweetalert2';
import types from '../types';
import { api, apiWithToken } from '../../services/api';

const login = (user) => ({
	type: types.authLogin,
	payload: user,
});

const checkingFinish = () => ({ type: types.authCheckingFinish });

export const startCheking = () => {
	return async (dispatch) => {
		try {
			const token = localStorage.getItem('token') || '';
			if (token !== '') {
				const response = await apiWithToken.get('auth/renew');
				const { id, email } = response.data;
				localStorage.setItem('token', response.data.token);
				dispatch(
					login({
						id,
						email,
					})
				);
			} else {
				dispatch(checkingFinish());
			}
		} catch (error) {
			dispatch(checkingFinish());
		}
	};
};

export const startLogin = ({ email, password }) => {
	return async (dispatch) => {
		try {
			await api
				.post('/auth', { email, password })
				.then((response) => {
					const { id, email, token } = response.data;
					localStorage.setItem('token', token);
					localStorage.setItem('id', id);
					localStorage.setItem('email', email);
					dispatch(
						login({
							id,
							email,
						})
					);
				})
				window.location.replace('/')
				.catch((err) => {
					return Swal.fire({
						icon: 'error',
						title: 'Error',
						text: err.response.data.message || 'Internal server error',
					});
				});
		} catch (err) {
			return Swal.fire({
				icon: 'error',
				title: 'Error',
				text: err.response.data.message || 'Internal server error',
			});
		}
	};
};

export const startGoogleLogin = (tokenId) => {
	return async (dispatch) => {
		try {
			const response = await api.post('/auth/social/google', { tokenId });
			const { id, email, token } = response.data;
			localStorage.setItem('token', token);
			localStorage.setItem('id', id);
			localStorage.setItem('email', email);
			dispatch(
				login({
					id,
					email,
				})
			);
			return window.location.replace('/');
		} catch (err) {
			return Swal.fire({
				icon: 'error',
				title: 'Error',
				text: err.response.data.message || 'Internal server error',
			});
		}
	};
};

const logout = () => ({
	type: types.authLogout,
});

export const startLogout = () => {
	return (dispatch) => {
		localStorage.clear();
		dispatch(logout());
	};
};

export const startRegister = async (input) => {
	try {
		await api.post('/user', input).then((res) => {
			const { id } = res.data;
			const { email } = input;
			api.post('user/validate', { id, email });
		})
		return Swal.fire({
			icon: 'success',
			title: 'Success',
			text: 'We have sent you an email to confirm you account',
		}).then(() => {
			window.location.replace('/login');
		});
	} catch (err) {
		return Swal.fire({
			icon: 'error',
			title: 'Error',
			text: err.response.data.message || 'Internal server error',
		});
	}
};
