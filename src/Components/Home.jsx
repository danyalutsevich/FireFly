import React from "react";
import Links, { MovieDBLinks } from "./Variables";
import "./Home.css";
import Loading from "./Loading.jsx";

export default class Film extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      movies: [],
    };
  }

  componentDidMount() {
    /* здесь надо фиксить, много нового, нихуя не понятно. */
  }

  render() {
    const { error, isLoaded, movies } = this.state;
    if (error) {
      return (
        <div className="ErrorMessage">
          <p>Error: {error.message}</p>
        </div>
      );
    } else if (isLoaded != true) {
      return <Loading />;
    } else {
      return (
        <div className="Film">
          <h1>Most popular movies</h1>
          <ul>
            {movies.map((movie, index) => (
              <ol className="List">
                <li key={movie.title}>
                  <div className="rectangle">
                    <a href="3">
                      {movie.title} {movie.year} {movie.imDbRating}
                    </a>
                    <img src={movie.image} alt={movie.title} />
                  </div>
                </li>
              </ol>
            ))}
          </ul>
        </div>
      );
    }
  }
}
