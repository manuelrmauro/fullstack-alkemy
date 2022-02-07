import React from 'react';
import Menu from '../Menu/Menu'
import './Nav.css'

function Nav() {
  return <div className='nav'>
    <span className='navTitle'>App</span>
    <Menu className='navMenu'/>
    </div>;
}

export default Nav;
