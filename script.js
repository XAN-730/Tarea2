const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const resultsContainer = document.querySelector("#results");
const resultsCount = document.querySelector("#results-count");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    return;
  }

  const apiUrl =
    `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}` +
    "&media=music&entity=song&country=US&limit=24";

  resultsContainer.innerHTML = "<p>Buscando canciones...</p>";
  resultsCount.textContent = "";

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`La API respondió con el estado ${response.status}`);
    }

    const data = await response.json();
    const songs = data.results || [];

    resultsContainer.innerHTML = "";
    resultsCount.textContent = `${data.resultCount} resultado(s)`;

    if (songs.length === 0) {
      resultsContainer.innerHTML = "<p>No se encontraron canciones.</p>";
      return;
    }

    songs.forEach((song) => {
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
  } catch (error) {
    resultsContainer.innerHTML =
      "<p>No fue posible cargar los resultados. Intenta de nuevo.</p>";
    resultsCount.textContent = "";
    console.error("Error al buscar canciones:", error);
  }
});
