import React from "react";
import Links from './Variables';
import "./Home.css";

export default class Film extends React.Component {
  constructor(props){
    super (props);
    this.state={
      error: null,
      isLoaded: false,
      movies: []
    };
  }

  componentDidMount() {
    fetch("здесь ссылка на апишку откуда брать предложения").then(res=>res.json()).then(
      (result)=>{
        this.setState({
          isLoaded: true,
          movies: result.items
        });
      }, 
      (error)=>{
        this.setState({
          isLoaded: true,
          error
        });
      }
    )
  }

  render() {
    const {error, isLoaded, movies} = this.state;
    if(error){
      return <div className='ErrorMessage'><p>Error: {error.message}</p></div>;
    }
    else if(isLoaded != true) {
      return <div className='LoadingMessage'><p>Loading...</p></div>;
    }
    else {
      return (
        <div className='Film'>
          <h1>Most popular movies</h1>
          <ul>
            {movies.map(movie => (
              <li key={movie.title}>
                {movie.title} {movie.year} {movie.imDbRating}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}
