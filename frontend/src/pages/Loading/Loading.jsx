import React from 'react'
import loading from '../../assets/loading.gif'
import './Loading.css'

function Loading() {
  return (
    <div className='loadingContainer'>
      <img src={loading} alt='loading'/>
    </div>
  )
}

export default Loading