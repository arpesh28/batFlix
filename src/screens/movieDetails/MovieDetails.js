import React, { useEffect, useState } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';

// Modules
import Carousel from 'react-elastic-carousel';
import { useHistory } from 'react-router-dom';

// Styles
import './MovieDetails.css';
import '../../App.css';

// Images
import star from '../../Images/star.svg';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import {
  getMovieDetailsSuccess,
  getSimilarMoviesSuccess,
} from '../../store/moviesStore';
import { getDetails, getSimilar } from '../../api/Api';

// Components
import Header from '../../components/header/Header';
import Movie from '../../components/movie-card/Movie';
import Trailer from '../../components/trailer/Trailer';
import Loader from '../../components/loader/Loader';

function MovieDetails({ location }) {
  // Router
  const history = useHistory();
  const { id } = location.state || {};

  // States
  const [counter, setCounter] = useState(0);
  const [grid, setGrid] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redux
  const { movieInfo, similarInfo } = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();

  useEffect(async () => {
    setLoading(true);
    const movieInfo = await getDetails({ id });
    const similarInfo = await getSimilar({ id });
    dispatch(getMovieDetailsSuccess(movieInfo));
    dispatch(getSimilarMoviesSuccess(similarInfo));
    setLoading(false);
  }, [id]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 480, itemsToShow: 2 },
    { width: 550, itemsToShow: 3 },
    { width: 768, itemsToShow: 5 },
    { width: 1000, itemsToShow: 6 },
    { width: 1400, itemsToShow: 8 },
    { width: 1600, itemsToShow: 9 },
  ];
  return (
    <div className='detailsContainer backgroundColor '>
      <Header />
      {loading && <Loader loading={loading} />}
      <div className='row detailsSubContainer align-items-center'>
        <div className='col-12 col-md-4 col-lg-4 d-flex justify-content-center'>
          <img
            src={`https://image.tmdb.org/t/p/w500/${
              movieInfo && movieInfo.poster_path
            }`}
            alt='Image'
            className='posterImage img-fluid'
          />
        </div>
        <div className='col-12 col-md-8 col-lg-8 detailstextContainer'>
          <div className='d-flex justify-content-between align-items-center movieHead'>
            <h2 className='heading'>{movieInfo && movieInfo.title}</h2>
            <div className='d-flex flex-row align-items-center justify-content-center'>
              <img src={star} alt='Image' className='star' />
              <h4 className='rating'>{movieInfo && movieInfo.vote_average}</h4>
            </div>
          </div>
          <p className='subtext'> {movieInfo && movieInfo.overview} </p>
          <h2 className='genresHead white25'>Genres</h2>
          <div className='d-flex flex-row genres '>
            {movieInfo &&
              movieInfo.genres &&
              movieInfo.genres &&
              movieInfo.genres.map((g) => {
                return <h3>{g.name}</h3>;
              })}
          </div>
          <Button
            className='trailerbtn'
            onClick={() => {
              setShowModal(true);
            }}
          >
            Watch trailer
          </Button>
        </div>
      </div>
      <div>
        <div className='recentContainer px-5 '>
          <div>
            {similarInfo && similarInfo.results.length == 0 ? (
              <div style={{ height: '20vh', backgroundColor: '#010b19' }}></div>
            ) : (
              <>
                <h2 className='white30 listHeading'>Similar Movies</h2>
                <Carousel
                  className='d-flex justify-content-center'
                  breakPoints={breakPoints}
                >
                  {similarInfo &&
                    similarInfo.results.map((item) => {
                      return (
                        item.poster_path && (
                          <div
                            key={item.id}
                            className='col-12 col-xs-6 col-sm-6 col-md-3 col-lg-1 col-xl-1 d-flex justify-content-center'
                          >
                            <Movie
                              type='latest'
                              image={item.poster_path}
                              id={item.id}
                            />
                          </div>
                        )
                      );
                    })}
                </Carousel>
              </>
            )}
          </div>
          {showModal && (
            <Trailer
              showModal={showModal}
              onclose={() => {
                setShowModal(false);
              }}
              setShowModal={setShowModal}
              id={id}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
