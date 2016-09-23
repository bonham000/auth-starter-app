import React from 'react';
import { Link } from 'react-router';
import './Nav.scss';


const Nav = () =>
  <div>
    <Link activeClassName='active' to=''>Home</Link>
    <Link activeClassName='active' to='about'>About</Link>
  </div>;

export default Nav;
