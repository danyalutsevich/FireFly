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
    top_rated: (page) => `https://api.themoviedb.org/3/movie/top_rated?api_key=${MovieDB_API_KEY}&language=en-US&page=${page}`,
    movie: (id) => `https://api.themoviedb.org/3/movie/${id}?api_key=${MovieDB_API_KEY}&language=en-US`,
}
