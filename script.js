// Get elements from the HTML
var searchInput = document.getElementById('search-input');
var searchButton = document.getElementById('search-button');
var movieContainer = document.getElementById('movie-container');
var videoContainer = document.getElementById('video-container');
var videoPlayer = document.getElementById('video-player');
var closeVideoButton = document.getElementById('close-video');

// Sound effect for button clicks
var clickSound = new Audio('click.mp3');

// Updated GIF links
var gifLinks = [
  "./gif/1152147517169814440.gif",
  "./gif/1152147517169814442.gif",
  "./gif/1152147517169814445.gif",
  "./gif/1152147517169814449.gif",
  "./gif/1152147517169814451.gif",
  "./gif/1152147517169814454.gif",
  "./gif/1152147517169814456.gif",
  "./gif/1152147517169814458.gif",
  "./gif/1152147517169814459.gif",
  "./gif/1152147517169814460.gif",
  "./gif/1152147517169814461.gif",
  "./gif/1152147517169814462.gif",
  "./gif/1152147517169814467.gif",
  "./gif/1152147517169814469.gif",
  "./gif/1152147517169814471.gif",
  "./gif/1152147517169814473.gif",
  "./gif/1152147517169814474.gif",
  "./gif/1152147517169814477.gif",
  "./gif/1152147517169814482.gif",
  "./gif/1152147517169814487.gif",
  "./gif/1152147517169814489.gif",
  "./gif/1152147517169814491.gif",
  "./gif/1152147517169814493.gif",
  "./gif/1152147517169814505.gif",
  "./gif/1152147517169814508.gif",
  "./gif/1152147517169814510.gif",
  "./gif/1152147517169814511.gif",
  "./gif/1152147517169814513.gif",
  "./gif/1152147517169814516.gif",
  "./gif/1152147517169814520.gif",
  "./gif/1152147517169814522.gif",
  "./gif/1152147517169814529.gif",
  "./gif/1152147517169814533.gif",
  "./gif/1152147517169814535.gif",
  "./gif/1152147517169814541.gif",
  "./gif/1152147517169814543.gif",
  "./gif/1152147517169814544.gif",
  "./gif/1152147517169814548.gif",
  "./gif/1152147517169814550.gif",
  "./gif/1152147517169814552.gif",
  "./gif/1152147517169814896.gif",
  "./gif/1152147517169814898.gif",
  "./gif/1152147517169814899.gif",
  "./gif/1152839429392847293.gif"
];

// Function to set a random GIF as the background
function setRandomGif() {
  var randomGif = gifLinks[Math.floor(Math.random() * gifLinks.length)];
  var gifBackground = document.getElementById('gif-background');
  gifBackground.style.backgroundImage = `url(${randomGif})`;
}

// Set a new GIF when the page is loaded
window.onload = function () {
  setRandomGif();
};

// Search on Enter Key
searchInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    searchForMovies();
  }
});

// When user types in search box, play click sound
searchInput.addEventListener('input', function () {
  clickSound.currentTime = 0; // Reset the audio to the start
  clickSound.play();
});

// When user clicks search button, search for movies
searchButton.addEventListener('click', function () {
  searchForMovies();
});

// When user clicks close video button, hide video
closeVideoButton.addEventListener('click', function () {
  hideVideo();
});

// Function to search for movies
function searchForMovies() {
  var searchText = searchInput.value.trim();

  if (searchText.length > 0) {
    var url = 'https://api.themoviedb.org/3/search/multi?api_key=e6cd252a87b876cd536ccfd719f4483f&query=' + encodeURIComponent(searchText);
    fetchMovies(url);
  }
}

// Function to fetch movies
function fetchMovies(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.results && data.results.length > 0) {
        movieContainer.innerHTML = '';
        data.results.forEach(movie => {
          var movieItem = createMovieItem(movie);
          movieContainer.appendChild(movieItem);
        });
      } else {
        movieContainer.innerHTML = '<h2>No movies or shows found.</h2>';
      }
    })
    .catch(() => {
      movieContainer.innerHTML = '<h2>Error fetching movies or shows.</h2>';
    });
}

// Function to create a movie item
function createMovieItem(movie) {
  var movieItem = document.createElement('div');
  movieItem.className = 'movie-item';

  var poster = document.createElement('img');
  poster.src = movie.poster_path ? 'https://image.tmdb.org/t/p/w500' + movie.poster_path : 'placeholder.png';
  poster.alt = movie.title || movie.name || 'Movie';

  var title = document.createElement('h3');
  title.textContent = movie.title || movie.name || 'Movie';

  var watchButton = document.createElement('button');
  watchButton.textContent = 'Watch';
  watchButton.addEventListener('click', function () {
    playMovie(movie);
  });

  movieItem.appendChild(poster);
  movieItem.appendChild(title);
  movieItem.appendChild(watchButton);

  return movieItem;
}

// Function to play the selected movie
function playMovie(movie) {
  var movieId = movie.id;
  var mediaType = movie.media_type || 'movie';
  var url = `https://streamfr.onrender.com/api/player/${movieId}`;
  if (mediaType === 'tv') url += '?series=1';

  videoPlayer.src = url;
  videoContainer.style.display = 'flex';
}

// Function to hide the video player
function hideVideo() {
  videoPlayer.src = '';
  videoContainer.style.display = 'none';
}
