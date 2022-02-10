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
				const { id, name } = response.data;
				localStorage.setItem('token', response.data.token);
				dispatch(
					login({
						id,
						name,
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

export const startLogin = (email, password) => {
	return async (dispatch) => {
		try {
			await api
				.post('/auth', { email, password })
				.then((response) => {
					const { id, name, token } = response.data;
					localStorage.setItem('token', token);
					localStorage.setItem('id', id);
					localStorage.setItem('name', name);
					dispatch(
						login({
							id,
							name,
						})
					);
					if (response.data.isFirstLogin) {
						window.location.replace('/rollselector');
					} else {
						window.location.replace('/home');
					}
				})
				.catch((error) => {
					if (error.response.status === 401) {
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Revisa tu email para validar tu cuenta.',
						});
					} else if (error.response.status === 400) {
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Lo sentimos, el email y/o contraseña no existen o son incorrectos.',
						});
					} else {
						Swal.fire({
							icon: 'error',
							title: 'Oops...',
							text: 'Lo sentimos, estamos teniendo problemas con el servidor.',
						});
					}
				});
		} catch (error) {
			// eslint-disable-next-line no-alert
			// alert('Lo siento, el email o contraseña son incorrectos, o no existen.');
			// window.location.reload(false);
			Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Lo sentimos, estamos teniendo problemas con el servidor.',
			});
		}
	};
};

export const startGoogleLogin = (tokenId) => {
	return async (dispatch) => {
		try {
			const response = await api.post('/auth/social/google', { tokenId });
			const { id, name, token } = response.data;
			localStorage.setItem('token', token);
			localStorage.setItem('id', id);
			localStorage.setItem('name', name);
			dispatch(
				login({
					id,
					name,
				})
			);
			return window.location.replace('/home');
		} catch (error) {
			console.log(error);
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Lo sentimos, Algo Salio mal',
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

export const startRegister = (input) => {
	return async (dispatch) => {
		try {
			const response = await api.post('/users', input)
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
      console.log('success')
      return Swal.fire({
				icon: 'success',
				title: 'Success',
				text: 'You can now log in with your new account',
			}).then(() => {
        window.location.replace('/login');
      })
		} catch (err) {
			return Swal.fire({
				icon: 'error',
				title: 'Error',
				text: err.response.data.message || 'Internal server error',
			});
		}
	};
};

export const startGoogleRegister = (tokenId) => {
	return async (dispatch) => {
		try {
			const response = await api.post('/auth/social/google', { tokenId });
			const { id, name, token } = response.data;
			localStorage.setItem('token', token);
			localStorage.setItem('id', id);
			localStorage.setItem('name', name);

			dispatch(
				login({
					id,
					name,
				})
			);
			return window.location.replace('/rollSelector');
		} catch (err) {
			console.log(err);
			return Swal.fire({
				icon: 'error',
				title: 'Oops...',
				text: 'Lo sentimos, Algo Salio mal con el registro',
			});
		}
	};
};
