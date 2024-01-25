const apiKey = '6a12e3e34ede255453980e164f46c6d5';
let apiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${apiKey}`;

const movieContainer = document.getElementById('movie-container');
const searchInput = document.getElementById('search');

async function fetchMovies() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        displayMovies(data.results);
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
}

function displayMovies(movies) {
    movieContainer.innerHTML = '';

    movies.forEach(movie => {
        const movieCard = document.createElement('div');
        movieCard.classList.add('movie-card');

        const posterUrl = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;

        movieCard.innerHTML = `
            <img src="${posterUrl}" alt="${movie.title}">
            <div class="movie-info">
                <h3>${movie.title}</h3>
                <p>${movie.release_date}</p>
                <button onclick="showSynopsis(${movie.id})">Show Synopsis</button>
            </div>
        `;

        movieContainer.appendChild(movieCard);
    });
}

async function searchMovies() {
    const searchTerm = searchInput.value;

    if (searchTerm) {
        apiUrl = `https://api.themoviedb.org/3/search/movie?query=${searchTerm}&api_key=${apiKey}`;
        fetchMovies();
    }
}

async function showSynopsis(movieId) {
  window.location.href = `movie-details.html?id=${movieId}`;
}

fetchMovies();
