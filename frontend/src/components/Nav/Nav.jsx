import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Menu from '../Menu/Menu';
import './Nav.css';

import AddCircleIcon from '@mui/icons-material/AddCircle';

function Nav({ email }) {
	const location = useLocation();
	return (
		<div className="nav">
			<div className="navTitleContainer">
				<div>
					<Link to="/" className="navTitle">
						App
					</Link>
				</div>
				<span className="navEmail">{email}</span>
			</div>
			<Menu className="navMenu" />

			{location.pathname !== '/add' && (
				<Link to="/add" className="addBtn">
					<AddCircleIcon className="addIcon" />
				</Link>
			)}
		</div>
	);
}

export default Nav;
