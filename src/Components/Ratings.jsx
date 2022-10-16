import { React, useState } from 'react';
import Links from './Variables';
import "./Ratings.css";

export default function Ratings() {

  const [films, setFilms] = useState([])

  if (films.length === 0) {
    fetch(Links.top250).then(data => data.json()).then(data => setFilms(data.items))
    return (<div>Loading...</div>)
  }
  

  return (
    <div>
      <h1>Top 250</h1>
      <table className="Table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Title</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {films.map((film, index) => {
            return (
              <tr key={film.id}>
                <td>{index + 1}</td>
                <td>{film.title}</td>
                <td>{film.rating}</td>
              </tr>
            )
          })}

        </tbody>

      </table>
    </div>
  );
}