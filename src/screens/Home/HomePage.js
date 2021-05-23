import React, { useEffect, useState } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';

// Modules
import Carousel from 'react-elastic-carousel';
import { useHistory } from 'react-router-dom';
import regeneratorRuntime from 'regenerator-runtime';

// Styles
import './HomePage.css';
import '../../App.css';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getRecentSuccess, getPopularSuccess } from '../../store/moviesStore';
import { searchMovie, getrecent, getPopular } from '../../api/Api';

// Components
import Header from '../../components/header/Header';
import Movie from '../../components/movie-card/Movie';
import Loader from '../../components/loader/Loader';

function HomePage() {
  const history = useHistory();

  const [counter, setCounter] = useState(0);
  const [grid, setGrid] = useState(1);
  const [searchHome, setSearchHome] = useState('');
  const [filter, setFilter] = useState('popularity.desc');
  const [loading, setLoading] = useState(false);

  // Redux
  const { recentInfo, popularInfo } = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();

  useEffect(async () => {
    setLoading(true);
    const recentInfo = await getrecent();
    const popularInfo = await getPopular({ filter });
    dispatch(getRecentSuccess(recentInfo));
    dispatch(getPopularSuccess(popularInfo));
    setLoading(false);
  }, [filter]);

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
    <div className='homeContainer backgroundColor'>
      <Header />
      {loading && <Loader loading={loading} />}
      <div className='bannerSection d-flex justify-content-center align-items-center flex-column'>
        <div className='overlay'></div>
        <div className='bannerTextContainer'>
          <h2 className='white30 text-center'>Discover Movies</h2>
          <h4 className='sub20 text-center'>
            BatFlix is an upcoming movie finder on demand service. A platform
            made with visually stunning design of our own. Stay Home & Stay
            Safe.
          </h4>
          <Form className='d-flex flex-row align-items-center mt-5 searchContainer'>
            <Form.Control
              type='text'
              placeholder='Search for Movie'
              className='mr-sm-2 searchbox'
              onChange={(e) => {
                setSearchHome(e.target.value);
              }}
            />
            <Button
              variant='outline-info'
              className='searchbtn'
              onClick={() => {
                history.push({
                  pathname: '/search',
                  state: { searchHome: searchHome },
                });
              }}
            >
              Search
            </Button>
          </Form>
        </div>
      </div>
      <div>
        <div className='recentContainer px-5  my-4 '>
          <h2 className='white30 listHeading text-left'>Newly Added</h2>

          <Carousel
            className='d-flex justify-content-center'
            breakPoints={breakPoints}
          >
            {recentInfo &&
              recentInfo.results.map((item) => {
                return (
                  item.poster_path && (
                    <div
                      key={item.id}
                      className='col-12 col-xs-12 col-sm-12 col-md-4 col-lg-1 col-xl-1 d-flex justify-content-center'
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
        </div>

        <div className=' px-5 mt-4'>
          <div className='d-flex flex-row justify-content-between'>
            <h2 className='white30 listHeading text-left'>Movie Feed</h2>
            <Form.Group controlId='exampleForm.SelectCustomSizeSm'>
              <Form.Control
                className='sortButn'
                as='select'
                size='sm'
                custom
                onChange={(e) => {
                  if (e.target.value == 'Popularity') {
                    setFilter('popularity.desc');
                  } else {
                    setFilter('release_date.desc');
                  }
                }}
              >
                <option>Popularity</option>
                <option>Release Date</option>
              </Form.Control>
            </Form.Group>
          </div>

          <div className='row d-flex justify-content-center align-items-center  align-items-center'>
            {popularInfo &&
              popularInfo.results.map((item) => {
                return (
                  item.backdrop_path && (
                    <div
                      key={item.id}
                      className='col-12 col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2 d-flex justify-content-center'
                    >
                      <Movie
                        type='popular'
                        image={item.backdrop_path}
                        likes={item.vote_count}
                        title={item.title}
                        popularity={item.popularity}
                        id={item.id}
                      />
                    </div>
                  )
                );
              })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
