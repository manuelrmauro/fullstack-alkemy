import React from 'react';
import AddForm from '../AddForm/AddForm';

function EditOperation({ id }) {
	
	return <form>
    <div>
      <h2>Edit operation</h2>
      <AddForm edit={true} id={id}/>
    </div>
  </form>;
}

export default EditOperation;
