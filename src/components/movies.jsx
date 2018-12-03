import React, { Component } from "react";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
import MoviesTable from "./moviesTable";
import _ from "lodash"; // used in sorting
class Movies extends Component {
  state = {
    // Recommended way is to initialize state properties to empty array
    // it might take time to get data from server and movies and genres shouldn't be undefined
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    sortColumn: { path: "title", order: "asc" }
  };
  // This will be called when an instatnce of this component is rendered in the DOM
  componentDidMount() {
    // Include all genres with spread operator have _id so as not to have key warnings errors
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = movie => {
    // Include all movies in a new array except the movie object being passed for deletion
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    // Overwrite the properties of state movies object with the new array
    this.setState({ movies }); //movies: movies
  };

  handleLike = movie => {
    // Create a clone of all movies
    const movies = [...this.state.movies];
    // Find index of the passed movie object
    const index = movies.indexOf(movie);
    // Clone the movie object
    movies[index] = { ...movies[index] };
    // Change/toggle the like
    movies[index].liked = !movies[index].liked;
    // set state passing the new movies array
    this.setState({ movies });
  };

  handlePageChange = page => {
    console.log(`Clicked page: ${page}`);
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    console.log(genre);
    this.setState({ selectedGenre: genre, currentPage: 1 });
  };

  // Path to the target property
  handleSort = path => {
    console.log(path);
    // clone existing sortColumn
    const sortColumn = { ...this.state.sortColumn };
    // if sort is applied and path is same reverse/change sortorder else set path
    if (sortColumn.path === path)
      // reverse sort
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    else {
      sortColumn.path = path;
      sortColumn.order = "asc";
    }
    // update state
    this.setState({ sortColumn });
  };

  render() {
    // Destructure this.state.movies.length to count
    const { length: count } = this.state.movies;
    // Rename movies to allMovies
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies
    } = this.state;
    if (count === 0) return <p>There are no movies in the database.</p>;

    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    // orderBy(input, array_of_property_names, sort_order)
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            items={this.state.genres}
            selectedItem={this.state.selectedGenre}
            onItemSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <p>Showing {filtered.length} movies in the database.</p>
          <MoviesTable
            movies={movies}
            onLike={this.handleLike}
            onDelete={this.handleDelete}
            onSort={this.handleSort}
          />
          <Pagination
            itemsCount={filtered.length}
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
