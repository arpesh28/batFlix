import React, { useEffect, useState } from 'react';
import { Row, Container, Col, Navbar } from 'react-bootstrap';
import { Link, NavLink, useHistory } from 'react-router-dom';
import logo from '../../Images/logo.png';
import './Header.css';

function Header() {
  const history = useHistory();
  return (
    <Navbar
      bg='dark'
      variant='dark'
      className='header justify-content-center pt-4'
    >
      <Navbar.Brand
        href='#home'
        className='d-flex flex-row align-items-center logo'
        onClick={() => {
          history.push({
            pathname: '/',
          });
        }}
      >
        <img
          alt=''
          src={logo}
          width='30'
          height='30'
          className='d-inline-block align-top'
        />{' '}
        <h2 className=''>BatFlix</h2>
      </Navbar.Brand>
    </Navbar>
  );
}

export default Header;
