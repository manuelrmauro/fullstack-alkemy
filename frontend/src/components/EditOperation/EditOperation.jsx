import React from 'react';
import AddForm from '../AddForm/AddForm';

function EditOperation({ id,refreshTable, onClose }) {
	
	return <form>
    <div className='modalContainer'>
      <h2>Edit operation</h2>
      <AddForm edit={true} id={id} refreshTable={refreshTable} onClose={onClose}/>
    </div>
  </form>;
}

export default EditOperation;
