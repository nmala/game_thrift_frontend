import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import '../css/NavBar.css';

class NavBar extends Component {
  render() {
    return (
      <div className='nav-container'>
        <NavLink className='main-nav-item' to="/Login"> Login </NavLink>
        <NavLink className='main-nav-item' to="/NewGameForm"> NewGameForm </NavLink>
        <NavLink className='main-nav-item' to="/HomePage"> HomePage </NavLink>
        <NavLink className='main-nav-item' to="/Cart"> Cart </NavLink>
        <NavLink className='main-nav-item' to="/SearchPage"> SearchPage </NavLink>
      </div>
    );
  }
}

export default NavBar;