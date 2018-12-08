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

  // takes sortColumn obj
  handleSort = sortColumn => {
    // update state
    this.setState({ sortColumn });
  };

  getPageData = () => {
    // properties from state obj
    const {
      pageSize,
      currentPage,
      sortColumn,
      selectedGenre,
      movies: allMovies // Rename movies to allMovies
    } = this.state;

    // Determine list of movies to display
    const filtered =
      selectedGenre && selectedGenre._id
        ? allMovies.filter(m => m.genre._id === selectedGenre._id)
        : allMovies;

    //   orderBy(input, array_of_property_names, sort_order)
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);

    const movies = paginate(sorted, currentPage, pageSize);
    // set totalCount & data to filtered.length & movies respectively
    return { totalCount: filtered.length, data: movies };
  };

  render() {
    // Destructure this.state.movies.length to count
    const { length: count } = this.state.movies;

    const { pageSize, currentPage, sortColumn } = this.state;

    if (count === 0) return <p>There are no movies in the database.</p>;
    // Rename data to movies
    const { totalCount, data: movies } = this.getPageData();

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
          <p>Showing {totalCount} movies in the database.</p>
          <MoviesTable
            movies={movies}
            // raiseSort method expects obj to be pased via props
            sortColumn={sortColumn}
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
