import React from 'react';
import Table from '../../components/Table/Table'

function ShowData({type}) {
  return <div>
    <div>
      <label>Category</label>
    <select>
      <option value='all'>All</option>
    </select>
    </div>
    <Table type={type}/>
  </div>;
}

export default ShowData;
