import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark main-color py-3'>
      <div className='container-fluid'>
        <span className='navbar-brand'>Internships</span>
        <button className='navbar-toggler' type='button'
          data-bs-toggle='collapse' data-bs-target='#navbarNavDropdown'
          aria-controls='navbarNavDropdown' aria-expanded='false'
          aria-label='Toggle Navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNavDropdown'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <a className='nav-link' href="#">Home</a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href="#">Search Internships</a>
            </li>
          </ul>
          <ul className='navbar-nav ms-auto'>
            <li className='navbar-item m-1'>
              <a type='button' className='btn btn-outline-light' href="#">Sign in</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default App;
