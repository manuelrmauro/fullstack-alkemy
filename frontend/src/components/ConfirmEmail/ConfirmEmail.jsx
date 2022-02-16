/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { api } from '../../services/api';

function ConfirmEmail() {
	const params = useParams();
	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const confirm = () => {
		const emailCode = searchParams.get('emailcode');

		if (params.id > 0 && emailCode !== '') {
			api
				.post(`user/validate/${params.id}/${emailCode}`)
				.then((res) => {
					Swal.fire({
						icon: 'success',
						title: 'Success',
						text: res.data.message,
					}).then(() => {
						navigate('/login');
					});
				})
				.catch((res) => {
					Swal.fire({
						icon: 'error',
						title: 'Error',
						text: 'Invalid code',
					}).then(() => {
						navigate('/');
					});
				});
		} else {
			navigate('/');
		}
	};

	useEffect(() => {
		confirm();
	}, []);

	return <div>{}</div>;
}

export default ConfirmEmail;
