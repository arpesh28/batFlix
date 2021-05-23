import React, { useEffect, useState } from 'react';
import { Row, Container, Col, Navbar } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import './Movie.css';
import heart from '../../Images/heart.svg';
import popular from '../../Images/popular.svg';

function Header({ image, type, counter, likes, title, popularity, id }) {
  const history = useHistory();

  return (
    <>
      {type == 'latest' ? (
        <div
          className='movieCard d-flex justify-content-center align-items-center'
          onClick={() => {
            history.push({
              pathname: '/movedetails',
              state: { id },
            });
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500/${image}`}
            className='moviePoster'
          />
        </div>
      ) : (
        <div
          className='movieCard2 d-flex justify-content-center align-items-center'
          onClick={() => {
            history.push({
              pathname: '/movedetails',
              state: { id },
            });
          }}
        >
          <div className='cardoverlay'></div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${image}`}
            className='moviePoster2'
          />
          <div className='cardText'>
            <h3 className='white25'>{title}</h3>

            <div className='d-flex flex-row'>
              <div className='d-flex likes align-items-center'>
                <img src={heart} />
                <h4 className='tiny mb-0'>{likes}</h4>
              </div>
              <div className='d-flex popular align-items-center '>
                <img src={popular} />
                <h4 className='tiny mb-0'>{popularity}</h4>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;
