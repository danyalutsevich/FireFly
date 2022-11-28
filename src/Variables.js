const API_KEY = "k_3e9gj61r";
const MovieDB_API_KEY = "4cb430850cc41209a4803c077e68cf99";

const Links = {
    top250: `https://imdb-api.com/API/Top250Movies/${API_KEY}`,
    search: `https://imdb-api.com/en/API/Search/${API_KEY}/`,
    trendings: `https://imdb-api.com/API/Top250Movies/${API_KEY}`,

}

// API docs https://developers.themoviedb.org/3
export const MovieDBLinks = {
    image: "https://image.tmdb.org/t/p/w500",
    image_original: "https://image.tmdb.org/t/p/original",
    credits: (movie_id)=>`https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=${MovieDB_API_KEY}&language=en-US`,
    top_rated: (page) => `https://api.themoviedb.org/3/movie/top_rated?api_key=${MovieDB_API_KEY}&language=en-US&page=${page}`,
    movie: (movie_id) => `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${MovieDB_API_KEY}&language=en-US`,
    popular: (page) => `https://api.themoviedb.org/3/movie/popular?api_key=${MovieDB_API_KEY}&language=en-US&page=${page}`,
    trending: (page) => `https://api.themoviedb.org/3/trending/movie/day?api_key=${MovieDB_API_KEY}&page=${page}`,
    search: (query, page) => `https://api.themoviedb.org/3/search/movie?api_key=${MovieDB_API_KEY}&language=en-US&query=${query}&page=${page}`
}
