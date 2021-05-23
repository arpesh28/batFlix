import { configureStore } from '@reduxjs/toolkit'
import movieReducer from './moviesStore'

export default configureStore({
  reducer: {
    movie: movieReducer,
  },
})