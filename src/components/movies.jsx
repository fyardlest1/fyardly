import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import SearchBox from './searchBox';
import { paginate } from "../utils/paginate";
import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    genres: [],
    pageSize: 4,
    searchQuery: '',
    selectedGenre: null,
    columnSort: { path: 'title', order: "asc" },
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genre" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (movie) => {
    const movies = this.state.movies.filter((m) => m._id !== movie._id);
    this.setState({ movies });
  };

  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: '', currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  }

  handleSort = (columnSort) => {

    this.setState({ columnSort });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      columnSort,
      selectedGenre,
      searchQuery,
      movies: allMovies,
    } = this.state;

    // Filtering Items
    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter((m) => m.genre._id === selectedGenre._id);
    }
      // selectedGenre && selectedGenre._id
      //   ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
      //   : allMovies;

    // Sorting Items
    const sorted = _.orderBy(filtered, [columnSort.path], [columnSort.order]);
    // Paginate the movie
    const movies = paginate(sorted, currentPage, pageSize);

    return { totalCount: filtered.length, data: movies }
  }

  render() {
    const { length: count } = this.state.movies;
    const {
      pageSize,
      currentPage,
      columnSort,
    } = this.state;

    if (count === 0)
      return (
        <p
          style={{
            fontFamily: "courgette",
            fontSize: 25,
            color: "tomato",
            paddingTop: 20,
          }}
        >
          There is no movie in the database
        </p>
      );

      const { totalCount, data: movies } = this.getPageData();

    return (
      <div className='row'>
        <div className='col-3'>
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className='col'>
          <Link 
              to='/movies/new'
              className='btn btn-primary'
              style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <p
            style={{
              fontFamily: "courgette",
              fontSize: 25,
              color: "blue",
              paddingTop: 20,
            }}
          >
            <strong>Showing {totalCount} movies in the database.</strong>{" "}
          </p>
          <SearchBox value={this.state.searchQuery} onChange={this.handleSearch} />
          <MoviesTable
            movies={movies}
            columnSort={columnSort}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
