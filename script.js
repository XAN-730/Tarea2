const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const resultsContainer = document.querySelector("#results");
const resultsCount = document.querySelector("#results-count");

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();
  const apiUrl =
    `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}` +
    "&media=music&entity=song&limit=24";

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      resultsContainer.innerHTML = "";
      resultsCount.textContent = `${data.resultCount} resultado(s)`;

      data.results.forEach((song) => {
        const card = document.createElement("article");
        card.className = "song-card";
        card.innerHTML = `
          <img
            src="${song.artworkUrl100}"
            alt="Portada de ${song.trackName}"
          />
          <div class="song-card-content">
            <h3>${song.trackName}</h3>
            <p>${song.artistName}</p>
            <audio controls src="${song.previewUrl}"></audio>
          </div>
        `;

        resultsContainer.appendChild(card);
      });
    });
});
