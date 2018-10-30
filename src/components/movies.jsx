import React, { Component } from "react";
import Like from "./common/like";
import ListGroup from "./common/listGroup";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../utils/paginate";
class Movies extends Component {
  state = {
    // Recommended way is to initialize state properties to empty array
    // it might take time to get data from server and movies and genres shouldn't be undefined
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1
  };
  // This will be called when an instatnce of this component is rendered in the DOM
  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
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
    this.setState({ selectedGenre: genre });
  };

  render() {
    // Destructure this.state.movies.length to count
    const { length: count } = this.state.movies;
    // Rename movies to allMovies
    const { pageSize, currentPage, movies: allMovies } = this.state;
    if (count === 0) return <p>There are no movies in the database.</p>;

    const movies = paginate(allMovies, currentPage, pageSize);

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
          <p>Showing {count} movies in the database.</p>
          <table className="table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Genre</th>
                <th>Stock</th>
                <th>Rate</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody>
              {movies.map(movie => (
                <tr key={movie._id}>
                  <td>{movie.title}</td>
                  <td>{movie.genre.name}</td>
                  <td>{movie.numberInStock}</td>
                  <td>{movie.dailyRentalRate}</td>
                  <td>
                    <Like
                      liked={movie.liked}
                      onClick={() => this.handleLike(movie)}
                    />
                  </td>
                  <td>
                    <button
                      onClick={() => this.handleDelete(movie)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* We had destructured this.state.movies.length to count */}
          <Pagination
            itemsCount={count}
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
