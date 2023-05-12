const API_KEY = "k_3e9gj61r";
const MovieDB_API_KEYS = ["4cb430850cc41209a4803c077e68cf99", "355506ff6d82d3b3d910dab304b2e621", "f09baad80eaaa6d1d7d5a65f9287254a", "d0e3f63a671bd7578d925356cd1e3a18"]
const MovieDB_API_KEY = MovieDB_API_KEYS[Math.floor(Math.random() * MovieDB_API_KEYS.length)];

const Links = {
    top250: `https://imdb-api.com/API/Top250Movies/${API_KEY}`,
    search: `https://imdb-api.com/en/API/Search/${API_KEY}/`,
    trendings: `https://imdb-api.com/API/Top250Movies/${API_KEY}`,

}

// API docs https://developers.themoviedb.org/3
export const MovieDBLinks = {
    image: "https://image.tmdb.org/t/p/w500",
    image_original: "https://image.tmdb.org/t/p/original",
    credits: (movie_id, media_type) => `https://api.themoviedb.org/3/${media_type}/${movie_id}/credits?api_key=${MovieDB_API_KEY}&language=en-US`,
    top_rated: (page) => `https://api.themoviedb.org/3/movie/top_rated?api_key=${MovieDB_API_KEY}&language=en-US&page=${page}`,
    movie: (movie_id) => `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${MovieDB_API_KEY}&language=en-US`,
    similar: (movie_id, media_type) => `https://api.themoviedb.org/3/${media_type}/${movie_id}/similar?api_key=${MovieDB_API_KEY}&language=en-US`,
    popular: (page) => `https://api.themoviedb.org/3/movie/popular?api_key=${MovieDB_API_KEY}&language=en-US&page=${page}`,
    trending: (page) => `https://api.themoviedb.org/3/trending/movie/day?api_key=${MovieDB_API_KEY}&page=${page}`,
    search: (query, page) => `https://api.themoviedb.org/3/search/multi?api_key=${MovieDB_API_KEY}&language=en-US&query=${query}&page=${page}&include_adult=true`,
    video: (movie_id, media_type) => `https://api.themoviedb.org/3/${media_type}/${movie_id}/videos?api_key=${MovieDB_API_KEY}&language=en-US`,
    person: (person_id) => `https://api.themoviedb.org/3/person/${person_id}?api_key=${MovieDB_API_KEY}&language=en-US`,
    person_credits: (person_id) => `https://api.themoviedb.org/3/person/${person_id}/combined_credits?api_key=${MovieDB_API_KEY}&language=en-US`,
    tv: (tv_id) => `https://api.themoviedb.org/3/tv/${tv_id}?api_key=${MovieDB_API_KEY}&language=en-US`,
    external_ids: (movie_id, media_type) => `https://api.themoviedb.org/3/${media_type}/${movie_id}/external_ids?api_key=${MovieDB_API_KEY}&language=en-US`,
    images: (movie_id, media_type) => `https://api.themoviedb.org/3/${media_type}/${movie_id}/images?api_key=${MovieDB_API_KEY}&language=en-US&include_image_language=en,null`,
}

export const TorrentIoLinks = {
    byImbdId: (imdb_id) => `https://torrentio.strem.fun/sort=seeders%7Cqualityfilter=4k/stream/movie/${imdb_id}.json`,
}
