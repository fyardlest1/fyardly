import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import ListGroup from "./common/listGroup";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import _ from 'lodash';

class Movies extends Component {
  state = {
    movies: [],
    currentPage: 1,
    genres: [],
    pageSize: 4,
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
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  handleSort = (columnSort) => {

    this.setState({ columnSort });
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      columnSort,
      selectedGenre,
      movies: allMovies,
    } = this.state;

    // Filtering Items
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter((m) => m.genre._id === selectedGenre._id)
        : allMovies;

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
