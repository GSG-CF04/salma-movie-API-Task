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
        });
    });
});
