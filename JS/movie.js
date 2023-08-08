const movieDetailPage = document.getElementById('movie-detail-page');

let movieDetails = JSON.parse(localStorage.getItem("movieDetails"));

moviePage();

function moviePage() {
    console.log("MovieDetails:",movieDetails);
        movieDetailPage.innerHTML = `
          <div class="col-sm-5">
            <img
              class="card-img"
              src="${movieDetails.Poster}"
              alt="Suresh Dasari Card"
            />
          </div>
          <div class="col-sm-7">
            <div class="card-body">
            <h5 class="card-title">Title: ${movieDetails.Title}</h5>
            <p class="card-text"><b>Year:</b> ${movieDetails.Year}</p>
            <p class="card-text"><b>Actors:</b> ${movieDetails.Actors}</p>
            <p class="card-text"><b>Awards:</b> ${movieDetails.Awards}</p>
            <p class="card-text"><b>Country:</b> ${movieDetails.Country}</p>
            <p class="card-text"><b>Director:</b> ${movieDetails.Director}</p>
            <p class="card-text"><b>Released:</b> ${movieDetails.Released}</p>
            <p class="card-text"><b>Genre:</b> ${movieDetails.Genre}</p>
            <p class="card-text"><b>IMDB Rating:</b> ${movieDetails.imdbRating}</p>
            <p class="card-text"><b>Writer:</b> ${movieDetails.Writer}</p>
            <p class="card-text"><b>IMDB Votes:</b> ${movieDetails.imdbVotes}</p>
            <p class="card-text"><b>Plot:</b> ${movieDetails.Plot}</p>
          </div>
        `;
}
