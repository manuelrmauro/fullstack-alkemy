import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link} from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import './Menu.css';
import { useDispatch } from 'react-redux';
import { startLogout } from '../../redux/actions/authActions';
import Swal from 'sweetalert2';

export default function LongMenu() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const dispatch = useDispatch();
	const open = Boolean(anchorEl);

	const handleLogOut = () => {
		Swal.fire({
			title: 'Do you want to log out?',
			showDenyButton: true,
			confirmButtonText: 'Yes',
			denyButtonText: 'No',
		}).then((result) => {
			if (result.isConfirmed) {
				dispatch(startLogout());
				window.location.replace('/login');
			}
		});
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const options = [
		<Link to="/" className="menuOption" onClick={handleClose}>
			<MenuItem>
				<HomeIcon className="menuOptionIcon" />
				<label>Home</label>
			</MenuItem>
		</Link>,
		<Link to="/incomes" className="menuOption" onClick={handleClose}>
			<MenuItem>
				<ArchiveIcon className="menuOptionIcon" />
				<label>Incomes</label>
			</MenuItem>
		</Link>,
		<Link to="/expenses" className="menuOption" onClick={handleClose}>
			<MenuItem>
				<UnarchiveIcon className="menuOptionIcon" />
				<label>Expenses</label>
			</MenuItem>
		</Link>,
		<Link to="/add" className="menuOption" onClick={handleClose}>
			<MenuItem>
				<AddCircleIcon className="menuOptionIcon menuOptionAddIcon" />
				<label>Add</label>
			</MenuItem>
		</Link>,
		<div
			onClick={() => {
				handleLogOut();
				handleClose();
			}}
			className="menuOption"
		>
			<MenuItem>
				<LogoutIcon className="menuOptionIcon" />
				<label>Log out</label>
			</MenuItem>
		</div>,
	];

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	return (
		<div>
			<IconButton
				className="iconMenu"
				aria-label="more"
				id="long-button"
				aria-controls={open ? 'long-menu' : undefined}
				aria-expanded={open ? 'true' : undefined}
				aria-haspopup="true"
				onClick={handleClick}
			>
				<MoreVertIcon />
			</IconButton>
			<Menu
				id="long-menu"
				MenuListProps={{
					'aria-labelledby': 'long-button',
				}}
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				PaperProps={{
					style: {
						maxHeight: '100vh',
					},
				}}
			>
				{options}
			</Menu>
		</div>
	);
}
