let searchInput = document.querySelector(".search-input");
let searchIcon = document.querySelector("#search-icon");
searchIcon.addEventListener("click", () => {
  let searchInputValue = searchInput.value;
  if (!searchInputValue) return;
  fetch(`https://imdb-api.com/en/API/Search/k_kg6jjxga/${searchInputValue}`)
    .then((res) => res.json())
    .then((res) => {
      let firstItem = res.results[0];
      let movieId = firstItem.id;
      fetch(
        `https://imdb-api.com/en/API/Title/k_kg6jjxga/${movieId}/FullActor,FullCast,Posters,Images,Trailer,Ratings,Wikipedia,`
      )
        .then((res) => res.json())
        .then((res) => {
          const {
            title: movieTitle,
            plot: movieDescription,
            year: releaseYear,
            runtimeStr: movieDuration,
            image: moviePoster,
          } = res;
          let movieDetailsElement = document.querySelector(".movie-details");

          let movieTitleDiv = document.createElement("div");
          let movieNameElement = document.createElement("h1");
          let movieDurationElement = document.createElement("p");
          movieTitleDiv.classList.add("movie-title");
          movieNameElement.classList.add("movie-name");
          movieDurationElement.classList.add("movie-duration");

          movieNameElement.innerText = movieTitle;
          movieDurationElement.innerText = movieDuration;

          movieTitleDiv.appendChild(movieNameElement);
          movieTitleDiv.appendChild(movieDurationElement);

          movieDetailsElement.appendChild(movieTitleDiv);
          //////////////////////////////
        });
    });
});
