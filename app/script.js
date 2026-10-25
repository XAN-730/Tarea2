const searchForm = document.querySelector("#search-form");
const searchInput = document.querySelector("#search-input");
const resultsContainer = document.querySelector("#results");
const resultsCount = document.querySelector("#results-count");
const MAX_PREVIEW_SECONDS = 30;
let activeAudio = null;

function searchWithJsonp(apiUrl) {
  return new Promise((resolve, reject) => {
    const callbackName = `itunesCallback_${Date.now()}`;
    const script = document.createElement("script");
    const separator = apiUrl.includes("?") ? "&" : "?";

    window[callbackName] = (data) => {
      delete window[callbackName];
      script.remove();
      resolve(data);
    };

    script.onerror = () => {
      delete window[callbackName];
      script.remove();
      reject(new Error("No fue posible conectar con iTunes."));
    };

    script.src = `${apiUrl}${separator}callback=${callbackName}`;
    document.body.appendChild(script);
  });
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) {
    return "0:00";
  }

  const safeSeconds = Math.min(Math.max(seconds, 0), MAX_PREVIEW_SECONDS);
  return `${Math.floor(safeSeconds / 60)}:${String(Math.floor(safeSeconds % 60)).padStart(2, "0")}`;
}

function setPlayerState(card, state) {
  const button = card.querySelector(".play-button");
  const status = card.querySelector(".player-status");

  card.classList.toggle("is-playing", state === "playing");
  button.setAttribute("aria-label", state === "playing" ? "Pausar muestra" : "Reproducir muestra");
  button.textContent = state === "playing" ? "❚❚" : "▶";

  if (state === "loading") {
    status.textContent = "Cargando señal...";
  } else if (state === "error") {
    status.textContent = "Muestra no disponible";
  } else {
    status.textContent = state === "playing" ? "Reproduciendo" : "Pausa";
  }
}

function pauseActiveAudio() {
  if (activeAudio) {
    activeAudio.pause();
    activeAudio.currentTime = 0;
    activeAudio = null;
  }
}

function createPlayer(song, card) {
  const audio = new Audio(song.previewUrl);
  audio.preload = "metadata";
  audio.volume = 0.8;
  audio.hidden = true;
  audio.setAttribute("aria-hidden", "true");
  audio.tabIndex = -1;
  card.appendChild(audio);

  const playButton = card.querySelector(".play-button");
  const muteButton = card.querySelector(".mute-button");
  const progress = card.querySelector(".progress");
  const volume = card.querySelector(".volume");
  const currentTime = card.querySelector(".current-time");
  const duration = card.querySelector(".duration");

  const updateProgress = () => {
    const elapsed = Math.min(audio.currentTime, MAX_PREVIEW_SECONDS);
    progress.value = String((elapsed / MAX_PREVIEW_SECONDS) * 100);
    currentTime.textContent = formatTime(elapsed);
  };

  const stopAtLimit = () => {
    if (audio.currentTime >= MAX_PREVIEW_SECONDS) {
      audio.pause();
      audio.currentTime = MAX_PREVIEW_SECONDS;
      activeAudio = null;
      setPlayerState(card, "paused");
      updateProgress();
    }
  };

  playButton.addEventListener("click", async () => {
    if (audio.paused) {
      if (audio.currentTime >= MAX_PREVIEW_SECONDS) {
        audio.currentTime = 0;
      }

      pauseActiveAudio();
      activeAudio = audio;
      setPlayerState(card, "loading");

      try {
        await audio.play();
      } catch (error) {
        activeAudio = null;
        setPlayerState(card, "error");
        console.error("Error al reproducir la muestra:", error);
      }
    } else {
      audio.pause();
    }
  });

  progress.addEventListener("input", () => {
    audio.currentTime = (Number(progress.value) / 100) * MAX_PREVIEW_SECONDS;
    updateProgress();
  });

  volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
    audio.muted = audio.volume === 0;
    muteButton.textContent = audio.muted ? "🔇" : "🔊";
    muteButton.setAttribute("aria-label", audio.muted ? "Activar sonido" : "Silenciar muestra");
  });

  muteButton.addEventListener("click", () => {
    audio.muted = !audio.muted;
    muteButton.textContent = audio.muted ? "🔇" : "🔊";
    muteButton.setAttribute("aria-label", audio.muted ? "Activar sonido" : "Silenciar muestra");
  });

  audio.addEventListener("loadedmetadata", () => {
    duration.textContent = formatTime(Math.min(audio.duration, MAX_PREVIEW_SECONDS));
  });
  audio.addEventListener("timeupdate", () => {
    updateProgress();
    stopAtLimit();
  });
  audio.addEventListener("playing", () => setPlayerState(card, "playing"));
  audio.addEventListener("pause", () => {
    if (activeAudio === audio) {
      activeAudio = null;
    }
    setPlayerState(card, "paused");
  });
  audio.addEventListener("ended", () => {
    activeAudio = null;
    audio.currentTime = 0;
    setPlayerState(card, "paused");
    updateProgress();
  });
  audio.addEventListener("error", () => {
    if (activeAudio === audio) {
      activeAudio = null;
    }
    setPlayerState(card, "error");
  });
}

function createSongCard(song, index) {
  const card = document.createElement("article");
  card.className = "song-card";
  card.style.animationDelay = `${Math.min(index * 45, 500)}ms`;

  const artworkWrap = document.createElement("div");
  artworkWrap.className = "artwork-wrap";

  const artwork = document.createElement("img");
  artwork.src = song.artworkUrl100;
  artwork.alt = `Portada de ${song.trackName}`;
  artwork.loading = "lazy";

  const trackIndex = document.createElement("span");
  trackIndex.className = "track-index";
  trackIndex.textContent = `TRACK ${String(index + 1).padStart(2, "0")}`;

  const playingIndicator = document.createElement("span");
  playingIndicator.className = "playing-indicator";
  playingIndicator.setAttribute("aria-label", "Reproducción activa");
  playingIndicator.innerHTML = "<i></i><i></i><i></i>";

  artworkWrap.append(artwork, trackIndex, playingIndicator);

  const content = document.createElement("div");
  content.className = "song-card-content";
  content.innerHTML = `
    <h3 title="${song.trackName}">${song.trackName}</h3>
    <p title="${song.artistName}">${song.artistName}</p>
    <div class="custom-player" aria-label="Reproductor de ${song.trackName}">
      <button class="play-button" type="button" aria-label="Reproducir muestra">▶</button>
      <div class="player-main">
        <div class="progress-row">
          <span class="time current-time">0:00</span>
          <input class="progress" type="range" min="0" max="100" value="0" step="0.1" aria-label="Progreso de la muestra" />
          <span class="time duration">0:30</span>
        </div>
        <div class="volume-row">
          <button class="mute-button" type="button" aria-label="Silenciar muestra">🔊</button>
          <input class="volume" type="range" min="0" max="1" value="0.8" step="0.05" aria-label="Volumen de la muestra" />
          <span class="player-status">Pausa</span>
        </div>
      </div>
    </div>
  `;

  card.append(artworkWrap, content);
  createPlayer(song, card);
  return card;
}

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const searchTerm = searchInput.value.trim();
  if (!searchTerm) {
    searchInput.focus();
    return;
  }

  pauseActiveAudio();
  const apiUrl =
    `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}` +
    "&media=music&entity=song&country=US&limit=24";

  resultsContainer.innerHTML = `
    <div class="empty-state loading-state">
      <span class="empty-icon" aria-hidden="true">◌</span>
      <h3>Sintonizando resultados...</h3>
      <p>Buscando nuevas frecuencias para tu exploración.</p>
    </div>
  `;
  resultsCount.textContent = "";

  try {
    let data;

    if (window.location.protocol === "file:") {
      data = await searchWithJsonp(apiUrl);
    } else {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`La API respondió con el estado ${response.status}`);
      }
      data = await response.json();
    }

    const songs = data.results || [];
    resultsContainer.innerHTML = "";
    resultsCount.textContent = `${data.resultCount} TRACKS`;

    if (songs.length === 0) {
      resultsContainer.innerHTML = `
        <div class="message-state">
          <span class="empty-icon" aria-hidden="true">∅</span>
          <h3>No encontramos esa frecuencia</h3>
          <p>Prueba con otro artista, álbum o título.</p>
        </div>
      `;
      return;
    }

    songs.forEach((song, index) => {
      if (song.previewUrl) {
        resultsContainer.appendChild(createSongCard(song, index));
      }
    });
  } catch (error) {
    resultsContainer.innerHTML = `
      <div class="message-state error-state">
        <span class="empty-icon" aria-hidden="true">!</span>
        <h3>La señal no está disponible</h3>
        <p>No fue posible cargar los resultados. Intenta de nuevo.</p>
      </div>
    `;
    resultsCount.textContent = "";
    console.error("Error al buscar canciones:", error);
  }
});
