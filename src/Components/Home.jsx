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
    fetch(Links.mpm).then(res=>res.json()).then(
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
      return <div class="Loading">
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
      <div class="wave"></div>
    </div>;
    }
    else {
      return (
        <div className='Film'>
          <h1>Most popular movies</h1>
          <ul>
          {movies.map((movie,index) => (
            
            <ol className='List'>
              
                <li key={movie.title}>
                <div className='rectangle'>
                  <a href="3">{movie.title} {movie.year} {movie.imDbRating}</a>
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
