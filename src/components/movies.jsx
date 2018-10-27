import React, { Component } from "react";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { getMovies } from "../services/fakeMovieService";
class Movies extends Component {
  state = {
    //not the right way to initialize state properties
    movies: getMovies(),
    pageSize: 4
  };

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
    console.log("Page");
  };

  render() {
    // Destructure this.state.movies.length to count
    const { length: count } = this.state.movies;
    if (count === 0) return <p>There are no movies in the database.</p>;
    return (
      <React.Fragment>
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
            {this.state.movies.map(movie => (
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
          pageSize={this.state.pageSize}
          onPageChange={this.handlePageChange}
        />
      </React.Fragment>
    );
  }
}

export default Movies;
