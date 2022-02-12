import * as React from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import { visuallyHidden } from '@mui/utils';
import './Table.css';

export default function EnhancedTable({ type, data }) {
	const [order, setOrder] = React.useState('asc');
	const [orderBy, setOrderBy] = React.useState('calories');
	const [selected, setSelected] = React.useState([]);
	const [page, setPage] = React.useState(0);
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const handleRequestSort = (event, property) => {
		const isAsc = orderBy === property && order === 'asc';
		setOrder(isAsc ? 'desc' : 'asc');
		setOrderBy(property);
	};

	// others START
	function createData(id, concept, category, amount, date, type) {
		return {
			id,
			concept,
			category,
			amount,
			date,
			type,
		};
	}

	const rows = data.map((data) =>
		createData(
			data.id,
			data.concept,
			data.category.name,
			data.type === 'Income' ? (
				<b className="tableAmount tableIncome">{`+$${data.amount}`}</b>
			) : (
				<b className="tableAmount tableExpense">{`-$${data.amount}`}</b>
			),
			data.date
		)
	);

	function descendingComparator(a, b, orderBy) {
		if (b[orderBy] < a[orderBy]) {
			return -1;
		}
		if (b[orderBy] > a[orderBy]) {
			return 1;
		}
		return 0;
	}

	function getComparator(order, orderBy) {
		return order === 'desc'
			? (a, b) => descendingComparator(a, b, orderBy)
			: (a, b) => -descendingComparator(a, b, orderBy);
	}

	// This method is created for cross-browser compatibility, if you don't
	// need to support IE11, you can use Array.prototype.sort() directly
	function stableSort(array, comparator) {
		const stabilizedThis = array.map((el, index) => [el, index]);
		stabilizedThis.sort((a, b) => {
			const order = comparator(a[0], b[0]);
			if (order !== 0) {
				return order;
			}
			return a[1] - b[1];
		});
		return stabilizedThis.map((el) => el[0]);
	}

	const headCells = [
		{
			id: 'concept',
			disablePadding: false,
			label: 'CONCEPT',
		},
		{
			id: 'category',
			disablePadding: false,
			label: 'CATEGORY',
		},
		{
			id: 'amount',
			disablePadding: false,
			label: 'AMOUNT',
		},
		{
			id: 'date',
			disablePadding: false,
			label: 'DATE',
		},
	];

	function EnhancedTableHead(props) {
		const {
			onSelectAllClick,
			order,
			orderBy,
			numSelected,
			rowCount,
			onRequestSort,
		} = props;
		const createSortHandler = (property) => (event) => {
			onRequestSort(event, property);
		};

		return (
			<TableHead>
				<TableRow className="tableHead">
					<TableCell padding="checkbox">
						<Checkbox
							className="tableHeadCheck"
							color="primary"
							indeterminate={numSelected > 0 && numSelected < rowCount}
							checked={rowCount > 0 && numSelected === rowCount}
							onChange={onSelectAllClick}
							inputProps={{
								'aria-label': 'select all',
							}}
						/>
					</TableCell>
					{headCells.map((headCell) => (
						<TableCell
							className="tableHeadSubtitles"
							key={headCell.id}
							padding={headCell.disablePadding ? 'none' : 'normal'}
							sortDirection={orderBy === headCell.id ? order : false}
						>
							<TableSortLabel
								active={orderBy === headCell.id}
								direction={orderBy === headCell.id ? order : 'asc'}
								onClick={createSortHandler(headCell.id)}
								className="tableHeadSubtitle"
							>
								{headCell.label}
								{orderBy === headCell.id ? (
									<Box
										component="span"
										sx={visuallyHidden}
										className="tableHeadSubtitle"
									>
										{order === 'desc'
											? 'sorted descending'
											: 'sorted ascending'}
									</Box>
								) : null}
							</TableSortLabel>
						</TableCell>
					))}
				</TableRow>
			</TableHead>
		);
	}

	EnhancedTableHead.propTypes = {
		numSelected: PropTypes.number.isRequired,
		onRequestSort: PropTypes.func.isRequired,
		onSelectAllClick: PropTypes.func.isRequired,
		order: PropTypes.oneOf(['asc', 'desc']).isRequired,
		orderBy: PropTypes.string.isRequired,
		rowCount: PropTypes.number.isRequired,
	};

	const EnhancedTableToolbar = (props) => {
		const { numSelected } = props;

		return (
			<Toolbar
				sx={{
					pl: { sm: 2 },
					pr: { xs: 1, sm: 1 },
					...(numSelected > 0 && {
						bgcolor: (theme) =>
							alpha(
								theme.palette.primary.main,
								theme.palette.action.activatedOpacity
							),
					}),
				}}
			>
				{numSelected > 0 ? (
					<Typography
						sx={{ flex: '1 1 100%' }}
						color="inherit"
						variant="subtitle1"
						component="div"
					>
						{numSelected} selected
					</Typography>
				) : (
					<h2 style={{ flex: '1 1 100%' }}>{type}</h2>
				)}

				{numSelected > 0 && (
					<Tooltip title="Delete">
						<IconButton>
							<DeleteIcon className="deleteIcon" />
						</IconButton>
					</Tooltip>
				)}
			</Toolbar>
		);
	};

	EnhancedTableToolbar.propTypes = {
		numSelected: PropTypes.number.isRequired,
	};

	// other END

	const handleSelectAllClick = (event) => {
		if (event.target.checked) {
			const newSelecteds = rows.map((n) => n.id);
			setSelected(newSelecteds);
			return;
		}
		setSelected([]);
	};

	const handleClick = (event, name) => {
		const selectedIndex = selected.indexOf(name);
		let newSelected = [];

		if (selectedIndex === -1) {
			newSelected = newSelected.concat(selected, name);
		} else if (selectedIndex === 0) {
			newSelected = newSelected.concat(selected.slice(1));
		} else if (selectedIndex === selected.length - 1) {
			newSelected = newSelected.concat(selected.slice(0, -1));
		} else if (selectedIndex > 0) {
			newSelected = newSelected.concat(
				selected.slice(0, selectedIndex),
				selected.slice(selectedIndex + 1)
			);
		}

		setSelected(newSelected);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(parseInt(event.target.value, 10));
		setPage(0);
	};

	const isSelected = (name) => selected.indexOf(name) !== -1;

	// Avoid a layout jump when reaching the last page with empty rows.
	const emptyRows =
		page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

	return (
		<Box className="tableContainer">
			<Paper sx={{ width: '100%', mb: 2 }}>
				<EnhancedTableToolbar numSelected={selected.length} type={type} />
				<TableContainer>
					<Table aria-labelledby="tableTitle" size="small">
						<EnhancedTableHead
							numSelected={selected.length}
							order={order}
							orderBy={orderBy}
							onSelectAllClick={handleSelectAllClick}
							onRequestSort={handleRequestSort}
							rowCount={rows.length}
						/>
						<TableBody>
							{/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
							{stableSort(rows, getComparator(order, orderBy))
								.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
								.map((row, index) => {
									const isItemSelected = isSelected(row.id);
									const labelId = `enhanced-table-checkbox-${index}`;

									return (
										<TableRow
											hover
											onClick={(event) => handleClick(event, row.id)}
											role="checkbox"
											aria-checked={isItemSelected}
											tabIndex={-1}
											key={row.id}
											selected={isItemSelected}
										>
											<TableCell padding="checkbox">
												<Checkbox
													color="primary"
													checked={isItemSelected}
													inputProps={{
														'aria-labelledby': labelId,
													}}
												/>
											</TableCell>
											<TableCell align="left">{row.concept}</TableCell>
											<TableCell align="left">{row.category}</TableCell>
											<TableCell align="left">{row.amount}</TableCell>
											<TableCell align="left">{row.date}</TableCell>
										</TableRow>
									);
								})}
							{emptyRows > 0 && (
								<TableRow>
									<TableCell colSpan={4} />
								</TableRow>
							)}
						</TableBody>
					</Table>
				</TableContainer>
				{type !== 'Last moves' && (
					<TablePagination
						className="tablePagination"
						rowsPerPageOptions={[5, 10, 25]}
						component="div"
						count={rows.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onPageChange={handleChangePage}
						onRowsPerPageChange={handleChangeRowsPerPage}
					/>
				)}
			</Paper>
		</Box>
	);
}
