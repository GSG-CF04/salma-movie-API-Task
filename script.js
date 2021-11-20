let searchInput = document.querySelector(".search-input");
let searchIcon = document.querySelector("#search-icon");
const cutText = (text) => {
  if (text.length > 550) {
    let cutTextResult = text.slice(0, 551);
    return cutTextResult + "...";
  } else {
    return text;
  }
};
searchIcon.addEventListener("click", () => {
  let searchInputValue = searchInput.value;
  if (!searchInputValue) return;
  fetch(`https://imdb-api.com/en/API/Search/k_bp53c8qv/${searchInputValue}`)
    .then((res) => res.json())
    .then((res) => {
      if (!res.results) return;
      let firstItem = res.results[0];
      let movieId = firstItem.id;
      fetch(
        `https://imdb-api.com/en/API/Title/k_bp53c8qv/${movieId}/FullActor,FullCast,Posters,Images,Trailer,Ratings,Wikipedia,`
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
          movieDetailsElement.innerHTML = "";
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
          let movieDescriptionElement = document.createElement("p");
          let movieReleaseElement = document.createElement("p");
          movieDescriptionElement.classList.add("movie-description");
          movieReleaseElement.classList.add("movie-release-year");
          movieDescriptionElement.innerText = cutText(movieDescription);
          movieReleaseElement.innerText = `Year:${releaseYear}`;
          movieDetailsElement.appendChild(movieDescriptionElement);
          movieDetailsElement.appendChild(movieReleaseElement);
          //////////
          let imageSectionElement = document.querySelector(".image-section");
          imageSectionElement.style.backgroundImage = `linear-gradient(270deg, rgba(0, 0, 0, 0) 0%, #1d1d1d 92.27%), url(${moviePoster})`;
        });
    });
});
