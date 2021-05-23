import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';

// Styles
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Screens
import HomePage from './screens/Home/HomePage';
import Search from './screens/Search/Search';
import MovieDetails from './screens/movieDetails/MovieDetails';

function App() {
  return (
    <Router className='App'>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route exact path='/search' component={Search} />
        <Route exact path='/movedetails' component={MovieDetails} />
      </Switch>
    </Router>
  );
}

export default App;
