import React, { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';

// Modules
import { useHistory } from 'react-router-dom';

// Styles
import './Search.css';
import '../../App.css';

// Redux
import { useSelector, useDispatch } from 'react-redux';
import { getRecentSuccess, searchSuccess } from '../../store/moviesStore';
import { searchMovie } from '../../api/Api';

// Components
import Header from '../../components/header/Header';
import Movie from '../../components/movie-card/Movie';
import Loader from '../../components/loader/Loader';

function Search({ location }) {
  const history = useHistory();
  const { searchHome } = location.state || {};

  // States
  const [search, setSearch] = useState(searchHome);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  // Redux
  const { searchInfo } = useSelector((state) => {
    return state.movie;
  });
  const dispatch = useDispatch();

  useEffect(async () => {
    setLoading(true);
    if (search) {
      const searchInfo = await searchMovie({ search });
      dispatch(searchSuccess(searchInfo));
    } else {
      console.log('');
    }
    setLoading(false);
  }, []);

  const onChange = async (e) => {
    setTimeout(() => {
      setSearch(e.target.value);
    }, 100);
    const searchInfo = await searchMovie({ search, page });
    dispatch(searchSuccess(searchInfo));
  };
  const onSubmit = async (e) => {
    setLoading(true);
    const searchInfo = await searchMovie({ search, page });
    dispatch(searchSuccess(searchInfo));
    setLoading(false);
  };

  return (
    <div className='homeContainer backgroundColor pb-5'>
      <Header />
      <div>{loading && <Loader loading={loading} />}</div>
      <div className='bannerSection d-flex justify-content-center align-items-center flex-column'>
        <div className='overlay'></div>
        <div className='bannerTextContainer'>
          <h2 className='white30 text-center'>Discover Movies</h2>
          <h4 className='sub20 text-center'>
            BatFlix is an upcoming movie finder on demand service. A platform
            made with visually stunning design of our own. Stay Home & Stay
            Safe.
          </h4>
          <Form className='d-flex flex-row align-items-center mt-5'>
            <Form.Control
              type='text'
              placeholder='Search for Movie'
              className='mr-sm-2 searchbox'
              onChange={onChange}
            />
            {/* <Button variant="outline-info"
                        className="searchbtn"
                        onClick={onSubmit}
                        >Search</Button> */}
          </Form>
        </div>
      </div>
      <div>
        <div className=' px-5 mt-4'>
          <h2 className='white30 listHeading'>Search Results</h2>

          <div className='row d-flex justify-content-center align-items-center  align-items-center'>
            {searchInfo &&
              searchInfo.results.map((item) => {
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
        <div className='pagination d-flex justify-content-center align-items-center mt-5'>
          <Button
            className='loadmore'
            onClick={() => {
              setPage(page - 1);
              onSubmit();
            }}
          >
            Previous
          </Button>
          <Button
            className='loadmore ml-5'
            onClick={() => {
              setPage(page + 1);
              onSubmit();
            }}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Search;
