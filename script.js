function getRecommendations() {
  const genre = document.getElementById("genres").value;
  const year = document.getElementById("year").value;
  const rating = document.getElementById("rating").value;
  const language = document.getElementById("language").value;
  fetch("data.json")
    .then(response => response.json())
    .then(data => {
      const movies = data.filter(movie => {
        return movie.genres.includes(genre) &&
               movie.release_date.startsWith(year) &&
               movie.vote_average >= rating &&
               movie.original_language === language;
      });
      let recommendations = "";
      if (movies.length > 0) {
        recommendations += "<h2>Recommendations:</h2>";
        movies.forEach(movie => {
          recommendations += `
            <div class="movie">
              <img src="${movie.homepage}${movie.poster_path}" alt="${movie.title}">
              
              <div class="details">
                <h3>${movie.title}</h3>
                <p>Release date: ${movie.release_date}</p>
                <p>Rating: ${movie.vote_average}</p>
                <p>Language: ${movie.original_language}</p>
                <p><a href="${movie.homepage}" target="_blank">Homepage</a></p>
              </div>
            </div>
          `;
        });
      } else {
        recommendations += "<p>No recommendations found.</p>";
      }
      document.getElementById("recommendations").innerHTML = recommendations;
    })
    .catch(error => console.error(error));
}