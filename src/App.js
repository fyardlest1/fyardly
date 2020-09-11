import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom'; 
import Movies from './components/movies'
import Customers from './components/common/customers';
import NotFound from './components/common/notFound';
import Rentals from './components/common/rentals';
import NavBar from './components/common/navBar';
import MovieForm from './components/common/movieForm';
import './App.css';

function App() {
  return (
    <React.Fragment>
      <NavBar />
      <main className="container">
        <Switch>
          <Route path='/movies/:id' component={MovieForm} />
          <Route path="/movies" component={Movies} />
          <Route path="/customers" component={Customers} />
          <Route path="/rentals" component={Rentals} />
          <Route path="/not-found" component={NotFound} />
          <Redirect from='/' exact to='/movies' />
          <Redirect to='/not-found' />
        </Switch>
      </main>
    </React.Fragment>
  );
}

export default App;
