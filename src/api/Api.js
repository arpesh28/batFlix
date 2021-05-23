const api = 'https://api.themoviedb.org/3';
// const api_key = process.env.REACT_APP_API;
const api_key = 'c84e3d4a9b983db2f509861514607f6f';

export const searchMovie = ({ search, page }) => {
  let searchLink;
  if (search) {
    searchLink = `${api}/search/movie?api_key=${api_key}&language=en-US&page=${page}&query=${search}`;
  } else {
    searchLink = `${api}/movie/popular?api_key=${api_key}&language=en-US&page=${page}`;
  }
  return fetch(searchLink)
    .then((data) => data.json())
    .then((data) => {
      return data;
    });
};

export const getrecent = () => {
  return fetch(
    `${api}/movie/top_rated?api_key=${api_key}&language=en-US&sort_by=release_date.desc&page=1`
  )
    .then((data) => data.json())
    .then((data) => {
      return data;
    })
    .catch((e) => {
      return console.log('error:', e);
    });
};

export const getPopular = ({ filter }) => {
  return fetch(
    `${api}/discover/movie?api_key=${api_key}&language=en-US&sort_by=${filter}&page=1`
  )
    .then((data) => data.json())
    .then((data) => {
      return data;
    })
    .catch((e) => {
      return console.log('error:', e);
    });
};

export const getDetails = ({ id }) => {
  return fetch(`${api}/movie/${id}?api_key=${api_key}&language=en-US`)
    .then((data) => data.json())
    .then((data) => {
      return data;
    })
    .catch((e) => {
      return console.log('error:', e);
    });
};
export const getSimilar = ({ id }) => {
  return fetch(`${api}/movie/${id}/similar?api_key=${api_key}&language=en-US`)
    .then((data) => data.json())
    .then((data) => {
      return data;
    })
    .catch((e) => {
      return console.log('error:', e);
    });
};
export const getVideos = ({ id }) => {
  return fetch(`${api}/movie/${id}/videos?api_key=${api_key}&language=en-US`)
    .then((data) => data.json())
    .then((data) => {
      return data;
    })
    .catch((e) => {
      return console.log('error:', e);
    });
};
