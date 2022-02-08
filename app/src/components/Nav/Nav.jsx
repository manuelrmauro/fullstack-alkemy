import React from 'react';
import { Link } from 'react-router-dom';
import Menu from '../Menu/Menu'
import './Nav.css'

function Nav() {
  return <div className='nav'>
    <Link to='/' className='navTitle'>App</Link>
    <Menu className='navMenu'/>
    </div>;
}

export default Nav;
