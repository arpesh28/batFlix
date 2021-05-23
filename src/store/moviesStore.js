import { createSlice } from '@reduxjs/toolkit'

export const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    recentInfo: null,
    popularInfo: null,
    searchInfo: null,
    movieInfo: null,
    similarInfo: null,
    videos: null
  },
  reducers: {
    getRecentSuccess: (state, action) => {
      return {
          ...state,
          recentInfo: action.payload
      }
    },
    getPopularSuccess: (state, action) => {
      return {
          ...state,
          popularInfo: action.payload
      }
    },
    searchSuccess: (state, action) => {
        return {
            ...state,
            searchInfo: action.payload
        }
      },
      getMovieDetailsSuccess: (state, action) => {
        return {
            ...state,
            movieInfo: action.payload
        }
      },
      getSimilarMoviesSuccess: (state, action) => {
        return {
            ...state,
            similarInfo: action.payload
        }
      },
      getvideosSuccess: (state, action) => {
        return {
            ...state,
            videos: action.payload
        }
      },
  },
});

export const {
    getRecentSuccess,
    searchSuccess,
    getPopularSuccess,
    getMovieDetailsSuccess,
    getSimilarMoviesSuccess,
    getvideosSuccess
} = movieSlice.actions
export default movieSlice.reducer
