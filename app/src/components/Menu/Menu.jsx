import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Link } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import ArchiveIcon from '@mui/icons-material/Archive';
import UnarchiveIcon from '@mui/icons-material/Unarchive';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import './Menu.css';

const options = [
	<Link to="/" className='menuOption'>
		<HomeIcon className='menuOptionIcon'/>
		<label>Home</label>
	</Link>,
	<Link to="/incomes" className='menuOption'>
		<ArchiveIcon  className='menuOptionIcon'/>
		<label>Incomes</label>
	</Link>,
	<Link to="/expenses" className='menuOption'>
		<UnarchiveIcon  className='menuOptionIcon'/>
		<label>Expenses</label>
	</Link>,
	<Link to="/add" className='menuOption'>
		<AddCircleIcon  className='menuOptionIcon menuOptionAddIcon'/>
		<label>Add</label>
	</Link>,
];

export default function LongMenu() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
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
				{options.map((option) => (
					<MenuItem key={option} onClick={handleClose}>
						{option}
					</MenuItem>
				))}
			</Menu>
		</div>
	);
}
