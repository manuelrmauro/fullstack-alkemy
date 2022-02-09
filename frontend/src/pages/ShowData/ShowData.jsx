import React from 'react';
import Table from '../../components/Table/Table';
import './ShowData.css'

function ShowData({ type }) {
	return (
		<div className="showDataContainer section">
				<div className='filter'>
					<label>Category</label>
					<select>
						<option value="all">All</option>
					</select>
				</div>
				<Table type={type} />
		</div>
	);
}

export default ShowData;
