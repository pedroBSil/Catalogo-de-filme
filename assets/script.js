document.addEventListener("DOMContentLoaded", function () {
    const apiKey = '6a12e3e34ede255453980e164f46c6d5';
    const apiUrl = `http://www.omdbapi.com/?s=batman&apikey=${apiKey}`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const moviesContainer = document.getElementById('movies-container');
  
        data.Search.forEach(movie => {
          const movieCard = document.createElement('div');
          movieCard.classList.add('movie-card');
  
          const title = document.createElement('h3');
          title.textContent = movie.Title;
  
          const year = document.createElement('p');
          year.textContent = `Ano: ${movie.Year}`;
  
          const poster = document.createElement('img');
          poster.src = movie.Poster;
          poster.alt = movie.Title;
  
          movieCard.appendChild(title);
          movieCard.appendChild(year);
          movieCard.appendChild(poster);
  
          moviesContainer.appendChild(movieCard);
        });
      })
      .catch(error => console.error('Erro ao buscar filmes:', error));
  });
  