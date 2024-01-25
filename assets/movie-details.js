const apiKey = '6a12e3e34ede255453980e164f46c6d5';
const movieDetailsContainer = document.getElementById('movie-details-container');

function getMovieDetails(movieId) {
    const detailsUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`;

    fetch(detailsUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Movie details not found');
            }
            return response.json();
        })
        .then(data => {
            displayMovieDetails(data);
        })
        .catch(error => {
            console.error('Error fetching movie details:', error);
            movieDetailsContainer.innerHTML = '<p>Movie details not found.</p>';
        });
}

function displayMovieDetails(movie) {
    const detailsHtml = `
        <div class="movie-details-card">
            <img src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">
            <div class="details-info">
                <h2>${movie.title}</h2>
                <p><strong>Release Date:</strong> ${movie.release_date}</p>
                <p><strong>Overview:</strong> ${movie.overview}</p>
                <h3>Cast:</h3>
                <ul>
                    ${getCastList(movie.credits.cast)}
                </ul>
            </div>
        </div>
    `;

    movieDetailsContainer.innerHTML = detailsHtml;
}

function getCastList(cast) {
    return cast.map(actor => `<li>${actor.name} (${actor.character})</li>`).join('');
}

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const movieId = urlParams.get('id');

if (movieId) {
    getMovieDetails(movieId);
} else {
    // Redirect to index.html or handle the error accordingly
    window.location.href = 'index.html';
}
